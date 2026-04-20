"use client";
import React, { useState } from "react";
import ResetPassword from "../_components/ResetPassword/ResetPassword";
import FirstForgetPassword from "../_components/FirstForgetPassword/FirstForgetPassword";
import CheckYourEmail from "../_components/CheckYourEmail/CheckYourEmail";
import ThirdResetPassword from "../_components/ThirdResetPassword/ThirdResetPassword";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Forgetpassword() {
  const [step, setStep] = useState<number>(1);
const [userEmail, setUserEmail] = useState<string>(""); 

  return (
    <>
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      {/* Container holding both panels */}
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden min-h-175">
        
        {/* The component we built above */}
        <ResetPassword />

        {/* The Form Panel (The design from your previous screenshot) */}
        <div className="flex items-center justify-center p-8 border-l border-slate-50">
        {step === 1 && <FirstForgetPassword  onNext={(email) => { setUserEmail(email); setStep(2); }} />}
       {step === 2 && <CheckYourEmail email={userEmail} onNext={() => setStep(3)} />}        
       {step === 3 && <ThirdResetPassword onComplete={() => {signOut({redirect:true,callbackUrl:"/login"}) 
       }} />}


           
        </div>
        
      </div>
    </main>
    </>
  );
}

// Main component grid wrapper
