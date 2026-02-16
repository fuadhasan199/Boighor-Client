import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
const Swip = () => {
    return (
        <div> 

             <Swiper modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{delay:3500,disableOnInteraction:false} } 
      loop:true
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    > 

      <SwiperSlide>
       <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: রাকিব হাসান (রংপুর)</h2>
    <p>ফিডব্যাক:প্যারাডক্সিক্যাল সাজিদ কিনেছি, একদম অসাধারণ! সাজিদের অ্যাডভেঞ্চার আর হাস্যরস মিলে পড়তে পড়তে শেষ করে ফেললাম। Boighor-এর ডেলিভারি খুব ফাস্ট, রংপুরে ২ দিনেই পেয়ে গেছি। অবশ্যই রেকমেন্ড করছি!</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>


      </SwiperSlide>
      <SwiperSlide>
             <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম:ফাতেমা বেগম</h2>
    <p>ফিডব্যাক: "হুমায়ূন আহমেদের 'দেবী' নিয়েছি। গল্পটা এত ইমোশনাল যে চোখে পানি চলে এসেছে। বইয়ের কোয়ালিটি ভালো, পেপার ভালো মানের। ছাড়ে পেয়েছি, দারুণ ডিল!"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★☆ 4.5/5</button>
    </div> 
    </div>
      </SwiperSlide>
      <SwiperSlide> 

    <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: সাইফুল ইসলাম</h2>
    <p>ফিডব্যাক: "হুমায়ূন আহমেদের 'দেবী' নিয়েছি। গল্পটা এত ইমোশনাল যে চোখে পানি চলে এসেছে। বইয়ের কোয়ালিটি ভালো, পেপার ভালো মানের। ছাড়ে পেয়েছি, দারুণ ডিল!"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>


      </SwiperSlide>
      <SwiperSlide> 
            <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: আয়শা সুলতানা (ঢাকা)</h2>
    <p>ফিডব্যাক: "অসমাপ্ত আত্মজীবনী (শেখ মুজিব) অর্ডার করেছি। ইতিহাসের জন্য পারফেক্ট। প্যাকেজিং খুব সুন্দর, বই অক্ষত অবস্থায় এসেছে। থ্যাঙ্ক ইউ Boighor!"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>
        
        </SwiperSlide> 
       <SwiperSlide>
  <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: মাহমুদুল হাসান</h2>
    <p>ফিডব্যাক: "'বেলা ফুরাবার আগে' (হুমায়ূন আহমেদ) পড়ে খুব ভালো লাগলো। আবেগ আর হাসির মিশেল। শুধু ডেলিভারি একটু লেট হয়েছে, কিন্তু বইয়ের কোয়ালিটি দারুণ।"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★☆ 4/5</button>
    </div> 
    </div>

       </SwiperSlide> 
        <SwiperSlide> 

       <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: নাজিয়া আক্তার</h2>
    <p>ফিডব্যাক: "ইসলামী বই 'রাহে বেলায়াত' নিয়েছি। খুব সহজ ভাষায় লেখা, জীবনে অনেক হেল্প করেছে। Boighor-এ অফারে পেয়ে সেভ করেছি। সবাইকে বলবো!"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>       
        </SwiperSlide>
         <SwiperSlide>
                <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: তানভীর আহমেদ</h2>
    <p>ফিডব্যাক: "অ্যাটমিক হ্যাবিটস (বাংলা অনুবাদ) কিনে পড়ছি। লাইফ চেঞ্জিং বই! সেল্ফ-হেল্পের জন্য বেস্ট। ফাস্ট ডেলিভারি + ভালো প্রাইস। Boighor সুপার!"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>  
         </SwiperSlide>
          <SwiperSlide>
    <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: সুমাইয়া খানম (রংপুর)</h2>
    <p>ফিডব্যাক: "শিরশেন্দু মুখোপাধ্যায়ের 'নবাবগঞ্জের অগন্তুক' পড়লাম। গল্পটা মজার আর থ্রিলিং। বইয়ের প্রিন্ট ক্লিয়ার, ভালো লেগেছে। রংপুর থেকে অর্ডার করে সহজেই পেয়েছি।"</p> 
   
    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★☆ 4.5/5</button>
    </div> 
    </div>  
          </SwiperSlide>
           <SwiperSlide>
    <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: আব্দুল্লাহ আল মামুন</h2>
    <p>ফিডব্যাক: "প্যারাডক্সিক্যাল সাজিদ ২ নিয়েছি। প্রথমটার মতোই দারুণ! অ্যাকশন আর মজা একসাথে। Boighor-এর কালেকশন দেখে অবাক হয়ে গেছি, সব বই আছে।"</p> 

    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>  
           </SwiperSlide> 

              <SwiperSlide>
                    <div className="card-body shadow-2xl m-2">
    <h2 className="card-title font-bold">নাম: লিমা রহমান</h2>
    <p>ফিডব্যাক: "হুমায়ূন আহমেদের 'ময়ূরাক্ষী' কিনেছি। ক্লাসিক বই, পড়ে মন ভরে গেছে। ইমোশনাল ডেপ্থ অনেক। ডেলিভারি ফ্রি + ছাড় পেয়ে খুশি। Boighor-কে লাভ!"</p> 

    <div className="justify-end card-actions">
      <button className="btn btn-success text-gray-900 p-2 ">রেটিং: ★★★★★ 5/5</button>
    </div> 
    </div>  
              </SwiperSlide>
     
    </Swiper>
            
        </div>
    );
};

export default Swip;