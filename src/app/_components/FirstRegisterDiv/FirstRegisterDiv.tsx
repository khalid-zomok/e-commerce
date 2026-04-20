import React from 'react';
import { HiStar} from 'react-icons/hi';
import { FaShieldAlt, FaStar } from 'react-icons/fa';
import reviewImg from '../../../assets/images/review-author.webp'
import { FaTruckFast } from 'react-icons/fa6';
import Image from 'next/image';
export default function FirstRegisterDiv() {
  const features = [
    {
      icon: <HiStar className="text-green-600" size={24} />,
      title: "Premium Quality",
      desc: "Premium quality products sourced from trusted suppliers.",
      bgColor: "bg-green-200"
    },
    {
      icon: <FaTruckFast className="text-green-600" size={24} />,
      title: "Fast Delivery",
      desc: "Same-day delivery available in most areas",
      bgColor: "bg-green-200"
    },
    {
      icon: <FaShieldAlt className="text-green-600" size={24} />,
      title: "Secure Shopping",
      desc: "Your data and payments are completely secure",
      bgColor: "bg-green-200"
    }
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-8 bg-white max-w-2xl">

      {/* Title Section */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome to <span className="text-[#0AAD0A]">FreshCart</span>
        </h1>
        <p className="text-lg text-slate-600 mt-4 leading-relaxed">
          Join thousands of happy customers who enjoy fresh groceries
           delivered right to their doorstep.
        </p>
      </div>
      {/* Features List */}
      <div className="flex flex-col gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className={`flex items-center justify-center p-3 rounded-full shrink-0 ${f.bgColor}`}>
              {f.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{f.title}</h3>
              <p className="text-slate-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Card */}
      <div className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-slate-50/30">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-full bg-green-200 overflow-hidden">
             {/* Using a placeholder for Sarah - replace with your image_51719c.png asset */}
            <Image height={200} width={200} src={reviewImg.src} alt="Sarah Johnson" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg">Sarah Johnson</h4>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
            </div>
          </div>
        </div>
        <p className="italic text-slate-600 leading-relaxed">
          {'FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!'}
        </p>
      </div>
    </div>
  );
}