import { Input, Select } from "@material-tailwind/react";
import { ProfileCircle, Calendar, Book, Translate, User } from "iconoir-react";

export default function DetailsPage() {
  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center p-6">
      <div className="w-full md:w-2/5 flex justify-center mb-6 md:mb-0">
        <img
          src="detail_image.png"
          alt="Illustration"
          className="w-[500px] h-[500px] object-cover"
        />
      </div>

      <div className="w-full md:w-2/5 p-8 rounded-xl  max-w-3xl mx-auto overflow-y-auto">
        <h2 className="text-center text-xl font-semibold mb-6 border-2 border-black rounded-2xl p-5">
          Enter your Details
        </h2>

        <form className="flex flex-col space-y-10 mt-20">
          <div>
            <Input
              placeholder="Enter your Name"
              className="rounded-none border-0 border-b border-gray-400 pr-0.5 shadow-none ring-0 hover:border-gray-900 focus:border-gray-900 data-[icon-placement=start]:!pl-[26px] dark:border-gray-600 dark:hover:border-gray-50 dark:focus:border-gray-50"
            >
              <Input.Icon className="data-[placement=start]:left-px">
                <ProfileCircle className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>

          <div>
            <Input
              placeholder="Username"
              className="rounded-none border-0 border-b border-gray-400 pr-0.5 shadow-none ring-0 hover:border-gray-900 focus:border-gray-900 data-[icon-placement=start]:!pl-[26px] dark:border-gray-600 dark:hover:border-gray-50 dark:focus:border-gray-50"
            >
              <Input.Icon className="data-[placement=start]:left-px">
                <Calendar className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>

          <div>
            <Input
              placeholder="Academic Records"
              className="rounded-none border-0 border-b border-gray-400 pr-0.5 shadow-none ring-0 hover:border-gray-900 focus:border-gray-900 data-[icon-placement=start]:!pl-[26px] dark:border-gray-600 dark:hover:border-gray-50 dark:focus:border-gray-50"
            >
              <Input.Icon className="data-[placement=start]:left-px">
                <Book className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>

          <div>
            <Input
              placeholder="About Yourself(Recent Achievements)"
              className="rounded-none border-0 border-b border-gray-400 pr-0.5 shadow-none ring-0 hover:border-gray-900 focus:border-gray-900 data-[icon-placement=start]:!pl-[26px] dark:border-gray-600 dark:hover:border-gray-50 dark:focus:border-gray-50"
            >
              <Input.Icon className="data-[placement=start]:left-px">
                <User className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>

          <div>
            <Input
              placeholder="Enter your language"
              className="rounded-none border-0 border-b border-gray-400 pr-0.5 shadow-none ring-0 hover:border-gray-900 focus:border-gray-900 data-[icon-placement=start]:!pl-[26px] dark:border-gray-600 dark:hover:border-gray-50 dark:focus:border-gray-50"
            >
              <Input.Icon className="data-[placement=start]:left-px">
                <Translate className="h-full w-full" />
              </Input.Icon>
            </Input>
          </div>

          <button className="w-full bg-purple-300 hover:bg-purple-400 text-black py-3 rounded-md shadow-md transition transform hover:scale-105">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
