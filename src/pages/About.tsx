import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { MapPin, Phone, Mail, Clock, Users, Award, Heart, Utensils } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import mai_and_gong from '../assets/mai_and_gong.jpg'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Every dish is prepared with love and dedication to authentic Thai flavors"
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe food brings people together and creates lasting memories"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service and cuisine"
    },
    {
      icon: Utensils,
      title: "Tradition",
      description: "Honoring authentic Thai cooking methods passed down through generations"
    }
  ];

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    address: null,
    phone: null,
    email: null,
    business_hours: {},
  });
  const [loadingContactInfo, setLoadingContactInfo] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .maybeSingle();
        if (error || !data) {
          setContactInfo({ address: null, phone: null, email: null, business_hours: {} });
        } else {
          const parsed = { ...data };
          if (typeof parsed.business_hours === 'string') {
            try { parsed.business_hours = JSON.parse(parsed.business_hours); } catch { parsed.business_hours = {}; }
          }
          setContactInfo({
            address: parsed.address,
            phone: parsed.phone,
            email: parsed.email,
            business_hours: parsed.business_hours || {},
          });
        }
      } catch {
        setContactInfo({ address: null, phone: null, email: null, business_hours: {} });
      } finally {
        setLoadingContactInfo(false);
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
            About Asian Fusion
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A journey of culinary excellence bringing authentic Asian flavors to your table
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="text-fusion-primary">Journey</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Asian Fusion is part of the Garoon Thai group (as is their sister Easy Go Thai restaurant @ the Mount).
                The Bethlehem shop opened in late 2023 - the location carefully selected to be within range of central
                Tauranga through Matua to Pyes Pa.
                At Asian Fusion the same recipes and quality control are used as elsewhere in Garoon Thai locations,
                in fact the staff regularly rotate between locations, so you can be assured of the best.
                We do not plan to have dine-in at Asian Fusion, but if you would like to eat top quality Thai cuisine
                in the comfort of your home (either pickup or delivery) please give us a try.
              </p>
            </div>
            <div className="animate-scale-in">
              <img 
                src={mai_and_gong}
                alt="AsianFusion Restaurant Team"
                className="rounded-lg shadow-large w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-fusion-secondary-light/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-fusion-primary">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at AsianFusion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-elegant text-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Section */}
      {/*<section className="py-20 bg-background">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">*/}
      {/*      <div className="animate-scale-in">*/}
      {/*        <img */}
      {/*          src={chefPortrait} */}
      {/*          alt="Chef Somchai - Head Chef at AsianFusion"*/}
      {/*          className="rounded-lg shadow-large w-full h-auto"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="animate-fade-in-up">*/}
      {/*        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">*/}
      {/*          Meet Chef <span className="text-fusion-primary">Somchai</span>*/}
      {/*        </h2>*/}
      {/*        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">*/}
      {/*          Chef Somchai brings over 30 years of culinary expertise to AsianFusion. Born and raised*/}
      {/*          in Bangkok, he learned the art of Thai cooking from his grandmother, who ran a small*/}
      {/*          street food stall in the bustling markets of Thailand.*/}
      {/*        </p>*/}
      {/*        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">*/}
      {/*          His passion for authentic flavors and dedication to traditional cooking methods has earned */}
      {/*          him recognition throughout the culinary community. Chef Somchai personally oversees every */}
      {/*          dish that leaves our kitchen, ensuring it meets the highest standards of taste and presentation.*/}
      {/*        </p>*/}
      {/*        <div className="flex flex-wrap gap-4">*/}
      {/*          <div className="bg-fusion-primary-light px-4 py-2 rounded-lg">*/}
      {/*            <span className="text-fusion-primary font-semibold">30+ Years Experience</span>*/}
      {/*          </div>*/}
      {/*          <div className="bg-fusion-secondary-light px-4 py-2 rounded-lg">*/}
      {/*            <span className="text-fusion-secondary font-semibold">Bangkok Native</span>*/}
      {/*          </div>*/}
      {/*          <div className="bg-fusion-accent-light px-4 py-2 rounded-lg">*/}
      {/*            <span className="text-fusion-accent font-semibold">Award Winner</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Timeline Section */}
      {/*<section className="py-20 bg-fusion-dark">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <div className="text-center mb-16 animate-fade-in-up">*/}
      {/*      <h2 className="font-playfair text-4xl md:text-5xl font-bold text-fusion-primary mb-4">*/}
      {/*        Our Timeline*/}
      {/*      </h2>*/}
      {/*      <p className="text-lg text-fusion-neutral max-w-2xl mx-auto">*/}
      {/*        25 years of growth, tradition, and community*/}
      {/*      </p>*/}
      {/*    </div>*/}

      {/*    <div className="max-w-4xl mx-auto">*/}
      {/*      {timeline.map((item, index) => (*/}
      {/*        <div key={index} className="flex items-center mb-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>*/}
      {/*          <div className="flex-shrink-0 w-24 text-right mr-8">*/}
      {/*            <span className="text-2xl font-bold text-fusion-primary">{item.year}</span>*/}
      {/*          </div>*/}
      {/*          <div className="flex-shrink-0 w-4 h-4 bg-fusion-primary rounded-full mr-8"></div>*/}
      {/*          <div className="flex-1">*/}
      {/*            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>*/}
      {/*            <p className="text-fusion-neutral">{item.description}</p>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-in-up">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-8">
                Get in <span className="text-fusion-primary">Touch</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-fusion-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      {loadingContactInfo ? "Loading..." : contactInfo.address ? contactInfo.address.split('\n').map((line, i) => <span key={i}>{line}<br/></span>) : <span className="italic">Not available</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-fusion-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">{
                      loadingContactInfo ? "Loading..." : contactInfo.phone ? (
                        <a
                          href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`}
                          className="underline hover:text-fusion-primary focus:outline-none focus:ring-2 focus:ring-fusion-primary rounded"
                        >
                          {contactInfo.phone}
                        </a>
                      ) : (
                        <span className="italic">Not available</span>
                      )
                    }</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-fusion-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">{
                      loadingContactInfo ? "Loading..." : contactInfo.email ? (
                        <a
                          href={`mailto:${contactInfo.email.trim()}`}
                          className="underline hover:text-fusion-primary focus:outline-none focus:ring-2 focus:ring-fusion-primary rounded"
                        >
                          {contactInfo.email}
                        </a>
                      ) : (
                        <span className="italic">Not available</span>
                      )
                    }</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-fusion-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <div className="text-muted-foreground">
                      {loadingContactInfo ? "Loading..." : Object.keys(contactInfo.business_hours).length > 0 ? (
                        Object.entries(contactInfo.business_hours).map(([day, hours]) => (
                          <p key={day}>{day}: {String(hours)}</p>
                        ))
                      ) : <span className="italic">Not available</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form (currently disabled) */}
            {/* The contact form has been temporarily removed to avoid type errors for a missing table. */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
