
import { Truck, BookMarked } from 'lucide-react';

const DeliveryPromise = () => {
  return (
    <div className="bg-gradient-to-r from-bookBrown-light to-bookBrown p-6 rounded-lg text-white shadow-md overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-6 z-10">
          <h3 className="text-2xl font-playfair font-bold mb-2">24-Hour Delivery/Pickup in Jaipur!</h3>
          <p className="opacity-90">We promise to deliver your books or collect them for sale within 24 hours of transaction.</p>
        </div>
        
        <div className="flex items-center justify-center gap-6 z-10">
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-3 mb-2 inline-block">
              <Truck className="w-10 h-10 animate-delivery-van" />
            </div>
            <p className="text-sm font-medium">Fast Delivery</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-3 mb-2 inline-block">
              <BookMarked className="w-10 h-10 animate-book-bounce" />
            </div>
            <p className="text-sm font-medium">Easy Pickup</p>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
    </div>
  );
};

export default DeliveryPromise;
