/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/47oriQm4ygU
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Chivo } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Component() {
  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#4CAF50] text-white">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <LeafIcon className="h-6 w-6" />
          <span className="sr-only">Crop Disease Classifier</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}>
            Contact
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white">
              <GlobeIcon className="h-4 w-4" />
              <span>Language</span>
              <ChevronDownIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Hindi</DropdownMenuItem>
              <DropdownMenuItem>Tamil</DropdownMenuItem>
              <DropdownMenuItem>Telugu</DropdownMenuItem>
              <DropdownMenuItem>Marathi</DropdownMenuItem>
              <DropdownMenuItem>Punjabi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f8f0]">
          <div className="container px-4 md:px-6">
            <div
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4CAF50]">
                    Identify Crop Diseases with Ease
                  </h1>
                  <p className="max-w-[600px] text-[#555] md:text-xl">
                    Our cutting-edge crop disease classifier app helps farmers and agronomists quickly identify and
                    address crop diseases, ensuring healthy, thriving crops.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/prediction"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#4CAF50] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#45a049] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}>
                    Try the App
                  </Link>
                </div>
              </div>
              <img
                src="Farmer1.png"
                width="100%"
                height="100%"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object- sm:w-full lg:order-last lg:aspect-square" />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f8f0]">
          <div className="container px-4 md:px-6">
            <div
              className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div
                  className="inline-block rounded-lg bg-[#4CAF50] px-3 py-1 text-sm text-white">Key Features</div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#4CAF50]">
                  Powerful Tools for Crop Health
                </h2>
                <p
                  className="max-w-[900px] text-[#555] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our crop disease classifier app provides farmers and agronomists with advanced tools to quickly
                  identify and address crop diseases, helping to ensure healthy, thriving crops.
                </p>
              </div>
            </div>
            <div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="image.png"
                width="100%"
                height="100%"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last" />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">Accurate Disease Identification</h3>
                      <p className="text-[#555]">
                        Our advanced AI-powered algorithm can accurately identify a wide range of crop diseases, helping
                        you address issues quickly.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">Customized Recommendations</h3>
                      <p className="text-[#555]">
                        Get tailored recommendations on the best treatment options for your specific crop and disease,
                        based on your location and growing conditions.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-[#4CAF50]">Real-time Monitoring and Alerts</h3>
                      <p className="text-[#555]">
                        Stay on top of your crop health with real-time monitoring and alerts, so you can address issues
                        before they become major problems.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f8f0]">
          <div
            className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2
                className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#4CAF50]">
                About Our Crop Disease Classifier
              </h2>
              <p
                className="max-w-[600px] text-[#555] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our crop disease classifier app is powered by advanced machine learning algorithms that can accurately
                identify a wide range of crop diseases. We're committed to helping farmers and agronomists maintain
                healthy, thriving crops.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#4CAF50] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#45a049] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}>
                Try the App
              </Link>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 border-t bg-[#f0f8f0]">
          <div
            className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2
                className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#4CAF50]">Get in Touch</h2>
              <p
                className="mx-auto max-w-[600px] text-[#555] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions or feedback about our crop disease classifier app? Get in touch with our team.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit" className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                  Contact Us
                </Button>
              </form>
              <p className="text-xs text-[#555]">We&apos;ll get back to you as soon as possible.</p>
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#4CAF50] text-white">
        <p className="text-xs">&copy; 2024 Crop Disease Classifier. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}>
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}

function ChevronDownIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>)
  );
}


function GlobeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>)
  );
}


function LeafIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>)
  );
}
