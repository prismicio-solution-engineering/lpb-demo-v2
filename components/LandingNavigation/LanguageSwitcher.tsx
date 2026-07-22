"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export function LanguageSwitcher({
  languages,
}: {
  languages: {
    url: string;
    lang_name: string;
  }[];
}) {
  const router = useRouter();
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    //Handle language redirects through the header language switch
    const newVersion = languages.find(
      (version) => version.lang_name === event.target.value
    );
    if (!newVersion) {
      //Redirect to 404 if alternative version does not exist
      router.push("/404");
    } else {
      router.push(newVersion.url);
    }
  }

  return (
    //Only added on desktop for now
    <div className="hidden lg:flex items-center">
      <div className="ml-8 flex">
        <a className="text-gray-700 hover:text-gray-800 flex items-center">
          <select
            id="location"
            name="location"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-vibrant-blue focus:border-vibrant-blue sm:text-sm rounded-md"
            onChange={handleChange}
            value={languages[0].lang_name}
          >
            {languages?.map((locale) => {
              return <option key={locale.lang_name}>{locale.lang_name}</option>;
            })}
          </select>
        </a>
      </div>
    </div>
  );
}
