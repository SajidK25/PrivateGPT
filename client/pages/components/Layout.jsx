import { Disclosure} from "@headlessui/react";
import Header from "./Header";
// import KeyChanger from "./input-elements/KeyChanger";
import CodeSelector from "./input-elements/CodeSelector";
import PhysicianTypeSelector from "./input-elements/PhysicianTypeSelector";

export default function Layout(props) {
  return (
    <div className="flex flex-col h-screen">
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <Header />

            <Disclosure.Panel
              className={`sm:hidden fixed inset-y-0 left-0 w-4/5 max-w-xs z-40 flex flex-col bg-gray-900 border-r dark:border-gray-600  transition-opacity duration-300 ease-in-out ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <Disclosure.Button className="px-8 inline-flex items-center justify-start rounded-md p-3 text-gray-400 hover:bg-gray-700">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="#858699">
                  <path d="M15 5.25A3.25 3.25 0 0 0 11.75 2h-7.5A3.25 3.25 0 0 0 1 5.25v5.5A3.25 3.25 0 0 0 4.25 14h7.5A3.25 3.25 0 0 0 15 10.75v-5.5Zm-3.5 7.25H7v-9h4.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2Zm-6 0H4.25a1.75 1.75 0 0 1-1.75-1.75v-5.5c0-.966.784-1.75 1.75-1.75H5.5v9Z"></path>
                </svg>
              </Disclosure.Button>

              <div className="flex-grow px-4 py-2">
                <div className="space-y-1">{getSidebarComponents()}</div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <Disclosure>
          <div
            id="sidebar"
            className="bg-gray-900 pl-4 pr-4  w-1/3 border-r hidden md:block  pt-5 border-gray-100 dark:border-gray-600 shadow-none sticky top-0"
          >
            <div
              className="w-full h-full hidden md:flex"
              data-projection-id="21"
            >
              <div className="w-full h-full flex flex-col ">
                <div className="flex justify-between items-center "></div>
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex flex-col">
                    <Disclosure.Button>
                      {getSidebarComponents()}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>

        <div className="flex flex-grow flex-col md:flex-row w-full overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}

function getSidebarComponents() {
  return (
    <>
      <CodeSelector />
      <div><span>  </span></div>
      <PhysicianTypeSelector/>
    </>
  );
}
