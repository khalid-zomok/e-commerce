"use client";
import ProfileSidebar from "@/app/_components/ProfileSidebar/ProfileSidebar";
import { MapPin, Phone, Building2, Trash2 } from "lucide-react";
import AddAddressDialog from "@/app/_components/AddAddressDialog/AddAddressDialog";
import { getAllUserAddresses, removeAddresse } from "@/actions/addresses.action";
import { useEffect, useState } from "react";
import { AddressType } from "@/api/types/product.type";
import { toast } from "sonner";
export default function AddressesPage() {
  const [addressItems, setAddressItems] = useState<AddressType[] | null>(null) 

  const getAllAddresses = async () => {
    const res = await getAllUserAddresses();
    if (res.status === "success") {
      setAddressItems(res.data)
      console.log(res);
    }
  };
  const removeAddresseFromAddresses = async (id:string) => {
    const res = await removeAddresse(id);
    if (res.status === "success") {
       toast.success(res.message, { position: "top-center" });
      setAddressItems(res.data)
      console.log(res);
    }
  };

  useEffect(() => {
    getAllAddresses();
  }, []);
  // Replace this array with your API response
  return (
    <div className="mx-auto w-full p-6 bg-slate-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <ProfileSidebar />

        <main className="md:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                My Addresses
              </h1>
              <p className="text-slate-500">
                Manage your saved delivery addresses
              </p>
            </div>

            <AddAddressDialog onSuccess={getAllAddresses}/>
          </div>

          <div className="space-y-4">
            {addressItems?.map((addr) => (
              <div
                key={addr._id}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6"
              >
                <div className="flex items-start gap-5">
                  <div className="bg-green-50 p-4 rounded-2xl text-[#2bb673]">
                    <MapPin size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {addr.name}
                    </h3>
                    <p className="text-slate-400 font-medium">
                      {addr.details}
                    </p>
                    <div className="flex flex-wrap gap-6 pt-2">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Phone size={18} className="text-slate-400" />
                        <span>{addr.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Building2 size={18} className="text-slate-400" />
                        <span>{addr.city}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  {/* <button className=" cursor-pointer p-3 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-colors flex-1 md:flex-none flex justify-center">
                    <Pencil size={20} />
                  </button> */}
                  <button onClick={()=>{
                    removeAddresseFromAddresses(addr._id)
                  }} className=" cursor-pointer p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors flex-1 md:flex-none flex justify-center">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
