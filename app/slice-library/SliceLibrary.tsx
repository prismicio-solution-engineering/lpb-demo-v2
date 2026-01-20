import React, { ReactNode } from "react";

import { SliceZone, SliceZoneLike } from "@prismicio/react";
import {
  ApiDocument,
  Extensions,
  LinkResolver,
  RenderContext
} from "@prismicio/api-renderer/lib/models";
import { SharedSliceRenderer } from "@prismicio/api-renderer";

// If needed, Add components from all your slice libraries if you have multiple:
// import { components as ecommerceComponents } from '@/slices/blog/index'
// import { components as marketingComponents } from '@/slices/marketing/index'
// const __allComponents = { ...ecommerceComponents, ...marketingComponents }

import { components as __allComponents } from "@/slices/index";

// import Nav which is a client component using @headlessui/react
import SliceLibraryNav from "./SliceLibraryNav";

import { type SliceLibrary } from "./page";

export function SliceLibrary({ libraries }: { libraries: SliceLibrary[] }) {
  return (
    <div>
      {/* Static sidebar for desktop */}
      <SliceLibraryNav libraries={libraries} />
      <div className="flex flex-col flex-1 bg-gray-50 md:pl-64">
        <div className="top-0 z-10 sticky flex bg-white shadow h-16 shrink-0">
          <div className="m-auto px-4 sm:px-6 md:px-8 max-w-7xl">
            <h1 className="font-semibold text-gray-900 text-2xl">
              Explore your Slice Libraries
            </h1>
          </div>
        </div>
        <main>
          <div className="mx-auto px-4 max-w-7xl">
            <SliceList libraries={libraries} />
          </div>
        </main>
      </div>
    </div>
  );
}

function SliceList({ libraries }: { libraries: SliceLibrary[] }) {
  const renderer = SharedSliceRenderer(renderContext);

  return libraries.map(library =>
    library.slices.map(({ model, mocks }) =>
      model.variations.map(variation => {
        const id = model.id;
        const key = `${library.name}-${id}-${variation.id}`;

        let variationFragment: ReactNode = (
          <div className="flex flex-wrap justify-center content-center bg-gray-100 p-1.5 border border-gray-200 rounded-md h-64 text-gray-500 text-xl uppercase bold">
            Mock missing for this variation
          </div>
        );

        const mock = mocks[variation.id];

        if (mock !== undefined) {
          const renderedMock = renderer.renderV2(model, mock!) as object;
          const mockApi = [
            {
              id,
              slice_type: id,
              ...renderedMock
            }
          ] as SliceZoneLike;

          const mockPageData = {
            primary_color: "#000000",
            secondary_color: "#FFFFFF",
            font_txt: "Inter",
            font_heading: "Inter"
          };

          variationFragment = (
            <div className="isolate bg-white p-1.5 border border-gray-200 rounded-md">
              <SliceZone
                slices={mockApi}
                components={__allComponents}
                context={{ pageData: mockPageData }}
              />
            </div>
          );
        }

        return (
          <div className="py-20" id={key} key={key}>
            <div className="mb-5 pb-5 border-gray-200 border-b">
              <h3 className="font-medium text-gray-900 text-lg leading-6">
                {model.name}
              </h3>
              <p className="mt-2 max-w-4xl text-gray-500 text-sm">
                {variation.name}
              </p>
            </div>
            {variationFragment}
          </div>
        );
      })
    )
  );
}

// An empty context that `SharedSliceRenderer` needs to work it's magic
const renderContext: RenderContext = {
  urlRewriter: {
    optimizeImageUrl(originUrl: string) {
      return originUrl;
    },
    rewriteImageUrl(view) {
      return view.url || "/viewUrlMissing";
    },
    rewriteFileUrl(originUrl: string) {
      return originUrl;
    },
    rewriteS3Bucket(url: string) {
      return url;
    },
    enforceCDN(url: string) {
      return url;
    }
  },
  emptyStringInsteadOfNull: false,
  Extension: {
    DocEncoder: {
      // @ts-expect-error
      encodeDocId: Extensions.encodeDocId
    },
    // @ts-expect-error
    encoders: Extensions.IDEncoders
  },
  LinkResolver: {
    buildUrl(_params: {
      linkResolver: LinkResolver | undefined;
      pageType: string;
      doc?: ApiDocument;
    }): string | undefined | null {
      return "/";
    }
  }
};
