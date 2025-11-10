import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, LucideCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import tripAdvisor from '/tripadvisor.svg'

interface BusinessHours {
  [day: string]: string;
}

interface SocialLinks {
  facebook?: string;
  google?: string;
  tripadvisor?: string;
}

interface ContactInfo {
  id: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  business_hours: BusinessHours;
  social_links: SocialLinks;
  maps_link: string | null;
}

// Replace GoogleIcon with a LucideCircle containing a G for a more consistent outline look
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: 20, height: 20 }}>
    <LucideCircle className="h-5 w-5" {...props} />
    <span style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '0.95rem',
      color: 'currentColor',
      fontFamily: 'Arial, Helvetica, sans-serif',
      pointerEvents: 'none',
      userSelect: 'none',
    }}>G</span>
  </span>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .maybeSingle();

        if (error || !data) {
          console.error('Error fetching contact info:', error);
          setContactInfo(null);
          toast({
            title: "Contact Info Unavailable",
            description: "Unable to load contact or business hours information from the database.",
            variant: "destructive",
          });
        } else {
          // Parse business_hours and social_links if they are strings (JSON) or null
          const parsedData = { ...data };
          // Ensure business_hours is always an object
          if (!parsedData.business_hours || typeof parsedData.business_hours === 'string') {
            try {
              parsedData.business_hours = typeof parsedData.business_hours === 'string'
                ? JSON.parse(parsedData.business_hours)
                : (parsedData.business_hours || {});
            } catch {
              parsedData.business_hours = {};
            }
          }
          // Ensure social_links is always an object
          if (!parsedData.social_links || typeof parsedData.social_links === 'string') {
            try {
              parsedData.social_links = typeof parsedData.social_links === 'string'
                ? JSON.parse(parsedData.social_links)
                : (parsedData.social_links || {});
            } catch {
              parsedData.social_links = {};
            }
          }
          setContactInfo(parsedData as ContactInfo);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
        setContactInfo(null);
        toast({
          title: "Contact Info Unavailable",
          description: "Unable to load contact or business hours information from the database.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, [toast]);

  if (loading) {
    return (
      <footer className="bg-fusion-dark text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading contact information...</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-fusion-dark text-white">
      {/* Tagline at the top */}
      <div className="container mx-auto px-4 pt-8 pb-2">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-fusion-primary text-center drop-shadow-lg tracking-wide">
          Savour the Flavour
        </h2>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-hero-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              <span className="font-playfair text-xl font-bold text-fusion-primary">
                Asian Fusion
              </span>
            </div>
            <p className="text-sm text-fusion-neutral leading-relaxed">
              Authentic Asian cuisine crafted with passion and tradition. Experience
              the vibrant flavors of Asia in every dish.
            </p>
            <div className="space-y-2">
              <div className="font-semibold text-fusion-secondary text-sm">Find Us & Leave a Review</div>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a
                  href={contactInfo?.social_links?.facebook || "https://www.facebook.com/profile.php?id=61554765050300&mibextid=9R9pXO"}
                  className="text-fusion-neutral hover:text-fusion-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                {/* Google (custom icon) */}
                <a
                  href={contactInfo?.social_links?.google || "https://www.google.com/maps/place/Asian+Fusion/@-37.6957024,176.1105458,17z/data=!3m1!4b1!4m6!3m5!1s0x6d6ddbce76893c89:0x6d674c3d8a9bb567!8m2!3d-37.6957024!4d176.1105458!16s%2Fg%2F11vlz6skm2?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"}
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Reviews"
                >
                  <GoogleIcon className="h-5 w-5 text-fusion-neutral hover:text-fusion-primary transition-colors" />
                </a>
                {/* TripAdvisor */}
                {/*<a*/}
                {/*  href={contactInfo?.social_links?.tripadvisor || "#"}*/}
                {/*  className="text-fusion-neutral hover:text-fusion-primary transition-colors"*/}
                {/*  target="_blank"*/}
                {/*  rel="noopener noreferrer"*/}
                {/*  aria-label="TripAdvisor"*/}
                {/*>*/}
                {/*  <img src={tripAdvisor} alt="TripAdvisor" className="h-5 w-5"/>*/}
                {/*</a>*/}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-fusion-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Menu", href: "/menu" },
                { name: "About Us", href: "/about" },
                { name: "News & Events", href: "/news" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-fusion-neutral hover:text-fusion-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-fusion-secondary">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-fusion-primary flex-shrink-0" />
                <span className="text-sm text-fusion-neutral">
                  {contactInfo?.address ? (
                    contactInfo.address.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < contactInfo.address.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    <span className="italic">Not available</span>
                  )}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-fusion-primary flex-shrink-0" />
                <a
                  href={contactInfo?.phone ? `tel:${contactInfo.phone}` : undefined}
                  className="text-sm text-fusion-neutral hover:text-fusion-primary transition-colors"
                >
                  {contactInfo?.phone || <span className="italic">Not available</span>}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-fusion-primary flex-shrink-0" />
                <a
                  href={contactInfo?.email ? `mailto:${contactInfo.email}` : undefined}
                  className="text-sm text-fusion-neutral hover:text-fusion-primary transition-colors"
                >
                  {contactInfo?.email || <span className="italic">Not available</span>}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-fusion-secondary">Business Hours</h3>
            <div className="space-y-2">
              {contactInfo?.business_hours && Object.keys(contactInfo.business_hours).length > 0 ? (
                Object.entries(contactInfo.business_hours).map(([day, hours], index) => (
                  <div key={day} className={index === 0 ? "flex items-start space-x-3" : "text-sm text-fusion-neutral ml-7"}>
                    {index === 0 && <Clock className="h-4 w-4 mt-1 text-fusion-primary flex-shrink-0" />}
                    <div className="text-sm text-fusion-neutral">
                      <div className="font-medium">{day}</div>
                      <div>{hours as string}</div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="italic text-fusion-neutral">Not available</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-fusion-neutral-dark/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-fusion-neutral">
            © {currentYear} Asian Fusion. All rights reserved.
          </p>
          {/*<div className="flex space-x-6 mt-4 md:mt-0">*/}
          {/*  <a href="#" className="text-sm text-fusion-neutral hover:text-fusion-primary transition-colors">*/}
          {/*    Privacy Policy*/}
          {/*  </a>*/}
          {/*  <a href="#" className="text-sm text-fusion-neutral hover:text-fusion-primary transition-colors">*/}
          {/*    Terms of Service*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
