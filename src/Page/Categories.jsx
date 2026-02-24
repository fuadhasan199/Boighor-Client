import React from 'react';

const Categories = () => {
    return (
        <div className='container mx-auto p-2 rounded-md bg-base-100'> 
         <h1 className='text-3xl font-bold text-center mb-10'>আমাদের সকল বইয়ের সংগ্রহ</h1> 
         <p className='text-center mt-2 mb-10'>আপনার পছন্দের লেখকের বই খুঁজে নিন সহজেই। শত বইয়ের মাঝ থেকে বেছে নিন আপনার প্রিয়টি।</p>
         

         <div className="mt-10 mb-10 flex flex-col md:flex-row gap-5 "> 

            <aside className='w-full md:w-1/4 bg-base-300 p-4 '> 
            <div className="mb-6 rounded-2xl "> 
                <h1 className='font-bold mb-3 text-success text-xl '>বইয়ের ক্যাটাগরি</h1> 

                <ul className='menu bg-transparent p-1 '> 
                    <li><a className="active">সবগুলো বই দেখুন</a></li>
                    <li><a>উপন্যাস</a></li>
                    <li><a>থ্রিলার</a></li>
                    <li><a>ইসলামিক</a></li>
                    <li><a>কবিতা</a></li>
                    <li><a>বিজ্ঞান কল্পকাহিনি</a></li> 
                    <li><a>সেলফ-হেল্প</a></li> 
                    <li><a>ইতিহাস</a></li>
                    
                </ul>

            </div>


      

            </aside>

         

         </div>

            
        </div>
    );
};

export default Categories;