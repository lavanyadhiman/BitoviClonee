import { useState } from "react";
function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    projectDetails: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
<section className="relative overflow-hidden text-[#F9F9FD] bg-[#0B0D17]/[.95] w-[1440px] h-[530px] ml-[40px] flex justify-center items-center">  <div className="relative z-10 flex flex-row justify-between p-8 h-full self-start lg:justify-self-end w-[min(100%,400px)] lg:w-auto lg:min-h-[400px]">
    <div className="contactUs self-start w-[300px]">
      <header className="text-[28px]">Contact Us</header>
      <p className="pt-4">
        <a href="tel:3126200386">(312) 620-0386</a> |{" "}
        <a href="mailto:contact@bitovi.com">contact@bitovi.com</a>
      </p>
    </div><form onSubmit={handleSubmit} className="w-[392x] space-y-4 ">
<div className="grid grid-cols-2 gap-4">
  <div className="hs-form-field">
    <label className="block mb-1">
      <span>First name</span>
      <span className="text-red-500">*</span>
    </label>
    <input
      id="firstname"
      name="firstname"
      type="text"
      className="w-[192px] p-2 bg-white text-black rounded"
      autoComplete="given-name"
      value={formData.firstname}
      onChange={handleChange}
      required
    />
  </div>

  <div className="hs-form-field">
    <label className="block mb-1 ">
      <span>Last name</span>
      <span className="text-red-500">*</span>
    </label>
    <input
      id="lastname"
      name="lastname"
      type="text"
      className="w-[191px] ml-[-9px] p-2 bg-white text-black rounded"
      autoComplete="family-name"
      value={formData.lastname}
      onChange={handleChange}
      required
    />
  </div>
</div>

<div className="hs-form-field">
  <label className="block mb-1">
    <span>Email</span>
    <span className="text-red-500">*</span>
  </label>
  <input
    id="email"
    name="email"
    type="email"
    className="w-[392px] p-2 bg-white text-black rounded"
    autoComplete="email"
    value={formData.email}
    onChange={handleChange}
    required
  />
</div>

<div className="hs-form-field">
  <label className="block mb-1">
    <span>Phone number</span>
  </label>
  <input
    id="phone"
    name="phone"
    type="tel"
    className="w-[392px] p-2 bg-white text-black rounded"
    autoComplete="tel"
    value={formData.phone}
    onChange={handleChange}
  />
</div>

<div className="hs-form-field">
  <label className="block mb-1">
    <span>What's your project?</span>
    <span className="text-red-500">*</span>
  </label>
  <textarea
    id="projectDetails"
    name="projectDetails"
    className="w-[392px] p-2 bg-white text-black rounded h-24"
    value={formData.projectDetails}
    onChange={handleChange}
    required
  />
</div>

<div className="text-left w-[392px]">
  <button
    type="submit"
    className="px-6 py-2 w-[392px] cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
  >
    Request Consultation
  </button>
</div>
</form>
</div>

<div className="absolute inset-0 z-0 overflow-hidden">
<img
src="https://www.bitovi.com/hubfs/limbo-generated/imgs/vectors/bitdots-2b.svg"
aria-hidden="true"
alt=""
className="hidden md:block absolute scale-75 rotate-90 -mt-20 -left-60"
/>
<img
src="https://www.bitovi.com/hubfs/limbo-generated/imgs/vectors/bitdots-2b.svg"
aria-hidden="true"
alt=""
className="hidden md:block absolute scale-75 rotate-180 -mt-8 -right-40"
/>
</div>
</section>
);
}

export default ContactForm;