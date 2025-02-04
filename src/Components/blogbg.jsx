function Blogbg() {
  return (
    <div
  className="bg-center bg-cover"
  style={{
    backgroundImage: `
      linear-gradient(to bottom, rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0.1)),
      url("https://www.bitovi.com/hubfs/How%20to%20Use%20React%20Suspense%20to%20Improve%20Your%20UI%20Load%20Time.png")
    `
  }}
>
      <div className="bg-category-react/75">
        
          <div className=" mx-auto bg-blend-multiply bg-center text-white flex">
            <div className="w-full p-10 sm:py-20 sm:px-12 md:py-[92px] md:px-[60px] lg:py-36 lg:px-20 xl:p-52 2xl:p-[280px]">
              <div>
                <p>
                  <a
                    href="https://www.bitovi.com/blog/topic/react"
                    className="blog-author text-category-react bg-white rounded-sm pt-[4px] pb-[4px] pl-[8px] pr-[8px] mr-1 px-2 py-1 transition-all duration-200 hover:-rotate-1 hover:scale-110
                    text-blue-500 font-bold"
                  >
                    REACT
                  </a>
                  | <time className="blog-author">September 7, 2022</time>
                </p>
              </div>
              <h1 className="suspense-heading text-4xl md:text-5xl lg:text-6xl !text-white py-4">
                How to Use React Suspense to Improve Your UI Load Time
              </h1>
              <p className="suspense-text subtitle-1  pb-5">
                React Suspense is a great way to improve the load time of your
                UI. In this post, learn about Suspense and why you should
                implement it in your next project.
              </p>
              <div className="h-14 flex items-center">
                <img
                  className="author-img h-12 w-12 md:h-14 md:w-14 object-cover rounded-full mr-4"
                  src="https://app.hubspot.com/settings/avatar/16829a86513d8e41ffbe71ee3a0d7f3d"
                  alt="Travis Draper"
                />
                <div>
                  <p className="blog-author text-[16px]  font-bold">Travis Draper</p>
                  <p className="author-title body-2 !text-white"></p>
                </div>
                <div className="flex flex-row flex-wrap ml-auto items-center justify-center gap-1 leading-none">
                  <div className=" blog-author hidden sm:block">Share:</div>
                  <a
                    href="https://twitter.com/intent/tweet?text="
                    title="Share on Twitter"
                    target="_blank"
                    aria-label="Share on Twitter"
                    className="flex items-center justify-center h-10 w-10 bg-white/10 rounded-full"
                  >
                    <img
                      src="https://www.bitovi.com/hubfs/limbo-generated/_astro/twitter-white.os3xLc3C_Z2nW4or.svg"
                      alt="Twitter"
                      className="h-5"
                      loading="lazy"
                      width="20"
                      height="18"
                      decoding="async"
                    />
                  </a>
                  <a
                    title="Share on Reddit"
                    target="_blank"
                    aria-label="Share on Reddit"
                    href="http://reddit.com/submit?url="
                  >
                    <img
                      src="https://www.bitovi.com/hubfs/limbo-generated/imgs/icons/reddit.png"
                      alt="Reddit"
                    />
                  </a>
                </div>
              </div>
              <br />
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default Blogbg;


