import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page({ params }: PageProps<"/abm-recap/[uid]">) {
	const { uid } = await params;
	const client = createClient();
	const page = await client.getByUID("abm_recap", uid);

	return <SliceZone slices={page.data.slices} components={components} />;
}