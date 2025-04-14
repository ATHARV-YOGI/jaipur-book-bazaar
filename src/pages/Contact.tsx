
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockSiteContent } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Phone, Mail, Send, MapPin } from 'lucide-react';

const Contact = () => {
  const { contact } = mockSiteContent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the message
    toast({
      title: "Message sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-bookBeige-light">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-bold text-bookBrown mb-6">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-medium mb-4">{contact.message}</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Atharv Yogi</h3>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{contact.atharv.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{contact.atharv.email}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Yogesh Sharma</h3>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{contact.yogesh.phone}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Vivek Sharma</h3>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{contact.vivek.phone}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Our Location
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    We operate throughout Jaipur with convenient pickup and delivery within the city.
                  </p>
                  <div className="aspect-video bg-muted rounded-md mt-4 overflow-hidden">
                    {/* This would be a map in a real app */}
                    <div className="w-full h-full bg-bookBrown/10 flex items-center justify-center text-muted-foreground">
                      Jaipur, Rajasthan
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-medium mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" name="name" placeholder="Enter your name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" placeholder="What is this regarding?" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Type your message here..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="bg-bookBrown hover:bg-bookBrown-dark">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="mt-8 bg-bookBrown text-white p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">How does the 24-hour delivery/pickup work?</h4>
                    <p className="text-bookBeige-light">
                      Once a transaction is completed, we coordinate with the seller to arrange pickup or delivery within 24 hours to your specified location in Jaipur.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">What if the book I receive is not as described?</h4>
                    <p className="text-bookBeige-light">
                      Contact us immediately, and we'll help resolve the issue with the seller or arrange a return if necessary.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Do you operate outside Jaipur?</h4>
                    <p className="text-bookBeige-light">
                      Currently, we only serve the Jaipur area to ensure our 24-hour delivery promise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
