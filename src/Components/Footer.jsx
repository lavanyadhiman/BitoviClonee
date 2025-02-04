function Footer(){
  const services = [
      { href: "/services/agile-project-management-consulting", text: "Project management consulting" },
      { href: "/services/product-design-consulting", text: "Product design consulting" },
      { href: "/services/frontend-development-consulting", text: "Frontend development consulting" },
      { href: "/services/backend-engineering-consulting", text: "Backend engineering consulting" },
      { href: "/services/devops-consulting", text: "DevOps engineering consulting" },
      { href: "/quality-engineering-consulting", text: "Quality engineering consulting" }
    ];
    const workProjects = [
      { href: "/bitovi-yum-case-study", text: "Yum" },
      { href: "/web-application-consulting-work/levis-ecommerce-responsive-redesign", text: "Levi's" },
      { href: "/web-application-consulting-work/haulhound-trucking-web-app", text: "HaulHound" },
      { href: "/ux-design-consulting/ux-case-studies/bafs-ppp", text: "BAFS" }
    ];
    const communityLinks = [
      { href: "/community", text: "Events" },
      { href: "/academy/", text: "Academy" },
      { href: "/blog", text: "Blog" },
      { href: "/open-source-javascript-frameworks", text: "Open source tools" }
    ];
  return(
      <footer className="footer-wrapper gap-6 pt-[56px] pl-[156px] pr-[84px] ">
          <div>
          <div className="footer-content gap-6 flex flex-column  text-[#D9DBE1]">
              <section className="first-section flex flex-col gap-6 pt-6 pr-6">
               
               <img
              src="https://www.bitovi.com/hubfs/limbo-generated/_astro/bitovi-logo-23-white.3yIZT4FH_1tclvJ.svg"
              alt="Bitovi home"
              className="w-[95px]"
              loading="lazy"
              width="109"
              height="34"
              decoding="async"
            />
               <a href="tel:3126200386" className="flex items-center gap-3 w-max">
            <img
              src="https://www.bitovi.com/hubfs/limbo-generated/_astro/mobile.ygAETHaF_Z1UhMWS.svg"
              alt=""
              className="inline mr-2"
              loading="lazy"
              width="14"
              height="20"
              decoding="async"
            />
            <div>(312) 620-0386</div>
          </a>
          <a href="mailto:contact@bitovi.com" className="flex items-center gap-3">
            <img
              src="https://www.bitovi.com/hubfs/limbo-generated/_astro/message.U-_f_TfX_U35yS.svg"
              alt=""
              className="inline mr-2"
              loading="lazy"
              width="20"
              height="18"
              decoding="async"
            />
            contact@bitovi.com
          </a>
          <ul className="flex gap-6 list-none">
            {[
              { href: "https://twitter.com/bitovi", img: "twitter-white.os3xLc3C_Z2nW4or.svg", alt: "Twitter" },
              { href: "https://github.com/bitovi", img: "github-white.bFTYrNMm_UUv0v.svg", alt: "GitHub" },
              { href: "https://www.linkedin.com/company/bitovi/", img: "linked-in-white.yLvNyruT_1bOTe.svg", alt: "LinkedIn" },
              { href: "https://discord.com/invite/Za8CFzvmz3", img: "discord-white.0oeXA4kq_JCPjW.svg", alt: "Discord" }
            ].map(({ href, img, alt }) => (
              <li key={href}>
                <a href={href} className="flex items-center justify-center h-10 w-10 bg-white/10 rounded-full">
                  <img
                    src={`https://www.bitovi.com/hubfs/limbo-generated/_astro/${img}`}
                    alt={alt}
                    className="h-5"
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
              
              </section>
              <section className="second-section mr-7 w-full sm:w-1/2 lg:w-full pt-6">

              <a className="heading-footer mb-4 uppercase text-[#F9F9FD]">
            <a href="digital-consulting-services">Services</a>
          </a>
          <ul className="md-[4px]">
            {services.map(({ href, text }) => (
              <li className="mb-1" key={href}>
                <a href={href}>{text}</a>
              </li>
            ))}
          </ul>              
              </section >
              <section className="third-section  w-full sm:w-1/2 lg:w-full pt-6">
                  <a className="heading-footer mb-4 uppercase text-[#F9F9FD]">
            <a href="/web-application-consulting-work">Our Work</a>
          </a>
          <ul>
            {workProjects.map(({ href, text }) => (
              <li className="mb-1" key={href}>
                <a href={href}>{text}</a>
              </li>
            ))}
          </ul>
              </section>
              <section className="fourth-section w-full sm:w-1/2 lg:w-full pt-6">
              <a className="heading-footer mb-4 uppercase text-[#F9F9FD]">
            <a href="/community">Community</a>
          </a>
          <ul>
            {communityLinks.map(({ href, text }) => (
              <li className="mb-1" key={href}>
                <a href={href}>{text}</a>
              </li>
            ))}
          </ul>                </section>
              <section className="fifth-section w-full sm:w-1/2 lg:w-full pt-6">
                 <a className="heading-footer mb-4 uppercase text-[#F9F9FD]"> <a href="/about">About</a> </a> <ul> 
                      <li className="mb-1 uppercase heading-footer">
                           <a href="/about/jobs">Careers</a>
                            </li> </ul> 
                            
              </section>
          </div>
          <section className="text-[#F9F9FD] flex flex-wrap mt-[80px] pb-[20px] justify-between"> <h2 className="sr-only">Legal</h2>
           <span> © 2024 Bitovi. All rights reserved</span> 
           </section>        
          </div>
          
      </footer>
  );
}
export default Footer;
