
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockSiteContent } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Clock } from 'lucide-react';

const About = () => {
  const { about } = mockSiteContent;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-bold text-bookBrown mb-8">
            About Old Books Market
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-bookBrown/10 p-3 rounded-full mb-4">
                  <BookOpen className="h-10 w-10 text-bookBrown" />
                </div>
                <h2 className="text-xl font-medium mb-2">Student-Focused</h2>
                <p className="text-muted-foreground">
                  Created specifically for Jaipur students to easily buy and sell textbooks at affordable prices.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-bookBrown/10 p-3 rounded-full mb-4">
                  <Clock className="h-10 w-10 text-bookBrown" />
                </div>
                <h2 className="text-xl font-medium mb-2">24-Hour Promise</h2>
                <p className="text-muted-foreground">
                  We guarantee delivery or pickup within 24 hours of transaction, saving you time and hassle.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-bookBrown/10 p-3 rounded-full mb-4">
                  <Users className="h-10 w-10 text-bookBrown" />
                </div>
                <h2 className="text-xl font-medium mb-2">Local Community</h2>
                <p className="text-muted-foreground">
                  Supporting sustainability and connection among Jaipur students through book reuse.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-playfair font-bold text-bookBrown mb-4">Our Story</h2>
            <p className="text-lg mb-6">{about}</p>
            
            <h3 className="text-xl font-medium mb-3">Our Mission</h3>
            <p className="mb-6">
              We aim to make education more affordable and sustainable for Jaipur students by creating an efficient marketplace for used textbooks. By connecting buyers and sellers directly, we help reduce waste and save money while ensuring quick delivery through our 24-hour promise.
            </p>
            
            <h3 className="text-xl font-medium mb-3">Featured Book Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-bookBeige p-4 rounded-md">
                <h4 className="font-medium mb-2">Drafter Books</h4>
                <p className="text-sm text-muted-foreground">
                  Technical drawing and engineering textbooks, perfect for engineering students.
                </p>
              </div>
              <div className="bg-bookBeige p-4 rounded-md">
                <h4 className="font-medium mb-2">NK Books</h4>
                <p className="text-sm text-muted-foreground">
                  Standard textbooks covering various subjects for all students.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-bookBrown text-white p-8 rounded-lg">
            <h2 className="text-2xl font-playfair font-bold mb-4">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">AY</span>
                </div>
                <h3 className="text-xl font-medium">Atharv Yogi</h3>
                <p className="text-bookBeige-light">Founder & Developer</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">YS</span>
                </div>
                <h3 className="text-xl font-medium">Yogesh Sharma</h3>
                <p className="text-bookBeige-light">Co-Founder & Manager</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">VS</span>
                </div>
                <h3 className="text-xl font-medium">Vivek Sharma</h3>
                <p className="text-bookBeige-light">Co-Founder & Operations</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
