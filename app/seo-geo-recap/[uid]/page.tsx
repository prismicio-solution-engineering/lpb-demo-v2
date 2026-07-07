import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }: PageProps<"/seo-geo-recap/[uid]">) {
	const { uid } = await params;
	const client = createClient();
	const page = await client.getByUID("seo_geo_recap", uid);

	return <SliceZone slices={page.data.slices} components={components} />;
}