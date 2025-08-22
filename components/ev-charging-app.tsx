"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import confetti from "canvas-confetti"
import {
  Check,
  Home,
  MapPin,
  Zap,
  User,
  Search,
  Battery,
  Navigation,
  Star,
  Route,
  Clock,
  ArrowLeft,
  CreditCard,
  Gift,
  TrendingUp,
  ExternalLink,
  Brain,
  Sparkles,
  IndianRupee,
  QrCode,
  Banknote,
  Wallet,
  Mic,
  MicOff,
  Volume2,
  Settings,
  Coffee,
  ShoppingBag,
  Utensils,
  Plus,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useToast } from "@/components/ui/use-toast"

type Screen =
  | "home"
  | "search"
  | "map"
  | "charging"
  | "profile"
  | "settings"
  | "analytics"
  | "payments"
  | "booking"
  | "schedule"
  | "amenities"
  | "route-planning"
  | "rewards"
  | "ai-recommendations"
  | "payment-methods"
  | "voice-assistant"
  | "wireless-waitlist"

export default function EVChargingApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [isCharging, setIsCharging] = useState(true)
  const [chargingProgress, setChargingProgress] = useState(65)
  const [rewardPoints, setRewardPoints] = useState(2450)

  const chargers = [
    {
      id: 1,
      name: "Tata Power EZ Charge",
      distance: "0.2 km",
      price: "₹18/kWh",
      available: 8,
      total: 12,
      rating: 4.8,
      fastCharge: true,
      status: "Available",
      features: ["Fast Charge", "WiFi", "Security", "App Control"],
      power: "150kW",
      connector: "CCS2",
      lastCharged: "15 min ago",
      online: true,
    },
    {
      id: 2,
      name: "Ather Grid",
      distance: "0.5 km",
      price: "₹15/kWh",
      available: 3,
      total: 6,
      rating: 4.5,
      fastCharge: true,
      status: "Available",
      features: ["Fast Charge", "Covered", "24/7"],
      power: "60kW",
      connector: "CCS2",
      lastCharged: "2 hours ago",
      online: true,
    },
    {
      id: 3,
      name: "Unwired Charging",
      distance: "0.8 km",
      price: "₹16/kWh",
      available: 2,
      total: 4,
      rating: 4.2,
      fastCharge: false,
      status: "Busy",
      features: ["WiFi", "Cafe Nearby", "Security"],
      power: "22kW",        
      connector: "Type 2",
      lastCharged: "Yesterday",
      online: false,
    },
    {
      id: 4,
      name: "ChargeZone Hub",
      distance: "1.2 km",
      price: "₹20/kWh",
      available: 5,
      total: 8,
      rating: 4.6,
      fastCharge: true,
      status: "Available",
      features: ["Fast Charge", "Restaurant", "Shopping"],
      power: "120kW",
      connector: "CCS2",
      lastCharged: "3 days ago",
      online: true,
    },
    {
      id: 5,
      name: "EESL Charging Point",
      distance: "1.5 km",
      price: "₹14/kWh",
      available: 1,
      total: 3,
      rating: 4.3,
      fastCharge: false,
      status: "Available",
      features: ["Covered", "Security", "24/7"],
      power: "22kW",
      connector: "Type 2",
      lastCharged: "1 week ago",
      online: true,
      },
    {
      id: 6,
      name: "Relux Electric",
      distance: "2.1 km",
      price: "₹21/kWh",
      available: 0,
      total: 6,
      rating: 4.7,
      fastCharge: true,
      status: "Busy",
      features: ["Fast Charge", "Convenience Store", "Fuel Station"],
      power: "180kW",
      connector: "CCS2",
      lastCharged: "5 days ago",
      online: true,
    },
  ]

  const aiRecommendations = [
    {
      id: 1,
      type: "optimal_time",
      title: "Best Charging Time",
      description: "Charge between 11 PM - 6 AM for 40% cost savings",
      savings: "₹180/month",
      icon: Clock,
    },
    {
      id: 2,
      type: "route_optimization",
      title: "Smart Route Planning",
      description: "Your usual route has 3 charging stations with better rates",
      savings: "₹50/trip",
      icon: Route,
    },
    {
      id: 3,
      type: "battery_health",
      title: "Battery Optimization",
      description: "Charge to 80% for better battery longevity",
      savings: "Extends battery life by 2 years",
      icon: Battery,
    },
  ]

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            chargers={chargers}
            setCurrentScreen={setCurrentScreen}
            isCharging={isCharging}
            chargingProgress={chargingProgress}
            rewardPoints={rewardPoints}
            aiRecommendations={aiRecommendations}
          />
        )
      case "search":
        return <SearchScreen chargers={chargers} setCurrentScreen={setCurrentScreen} />
      case "map":
        return <MapScreen chargers={chargers} setCurrentScreen={setCurrentScreen} />
      case "charging":
        return (
          <ChargingScreen
            isCharging={isCharging}
            setIsCharging={setIsCharging}
            chargingProgress={chargingProgress}
            setCurrentScreen={setCurrentScreen}
          />
        )
      case "profile":
        return <ProfileScreen setCurrentScreen={setCurrentScreen} rewardPoints={rewardPoints} />
      case "settings":
        return <SettingsScreen setCurrentScreen={setCurrentScreen} />
      case "analytics":
        return <AnalyticsScreen setCurrentScreen={setCurrentScreen} />
      case "booking":
        return <BookingScreen chargers={chargers} setCurrentScreen={setCurrentScreen} />
      case "route-planning":
        return <RoutePlanningScreen setCurrentScreen={setCurrentScreen} />
      case "rewards":
        return <RewardsScreen setCurrentScreen={setCurrentScreen} rewardPoints={rewardPoints} />
      case "ai-recommendations":
        return <AIRecommendationsScreen setCurrentScreen={setCurrentScreen} recommendations={aiRecommendations} />
      case "payment-methods":
        return <PaymentMethodsScreen setCurrentScreen={setCurrentScreen} />
      case "voice-assistant":
        return <VoiceAssistantScreen setCurrentScreen={setCurrentScreen} />
      case "wireless-waitlist":
        return <WirelessWaitlistScreen setCurrentScreen={setCurrentScreen} />
      default:
        return (
          <HomeScreen
            chargers={chargers}
            setCurrentScreen={setCurrentScreen}
            isCharging={isCharging}
            chargingProgress={chargingProgress}
            rewardPoints={rewardPoints}
            aiRecommendations={aiRecommendations}
          />
        )
    }
  }

  return (
    <div className="h-screen text-white overflow-hidden" style={{ backgroundColor: "#141F1C" }}>
      <div className="max-w-md mx-auto h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {renderScreen()}
          {/* Voice Assistant Button - Moved inside the main content */}
          <div className="fixed bottom-24 right-8 z-50">
            <Button
              size="icon"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-500 shadow-lg border-2 border-white/20"
              onClick={() => setCurrentScreen("voice-assistant")}
            >
              <Mic className="w-6 h-6 text-white" />
            </Button>
          </div>

          {/* Extra padding for floating button */}
          <div className="h-20"></div>
        </div>
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    </div>
  )
}

function HomeScreen({
  chargers,
  setCurrentScreen,
  isCharging,
  chargingProgress,
  rewardPoints,
  aiRecommendations,
}: any) {
  const { toast } = useToast();
  const [isVehicleCollapsed, setIsVehicleCollapsed] = useState(false);

  const toggleVehicleCollapse = () => {
    setIsVehicleCollapsed(!isVehicleCollapsed);
  };

  const handleJoinWaitlist = () => {
    toast({
      title: "You're on the list!",
      description: "Thank you for joining the wireless charging waitlist. We'll notify you as soon as it's available in your area!",
      duration: 5000,
      variant: "default",
      onOpenChange: (open) => {
        if (open) {
          confetti({
            particleCount: 200,
            spread: 70,
            origin: {
              y: 0.7,
            },
          });
        }
      },
    });
  };
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 pt-12 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white">Good morning, Sandeep!</h1>
          <p className="text-gray-300 text-sm">Ready to charge your EV?</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentScreen("rewards")}
            className="hover:bg-gray-700/50"
          >
            <Gift className="w-5 h-5 text-teal-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentScreen("ai-recommendations")}
            className="hover:bg-gray-700/50"
          >
            <Brain className="w-5 h-5 text-purple-400" />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Hero Car Image */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-[2/1] bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-xl overflow-hidden border border-gray-700/50">
            <Image
              src="/nexon-ev.jpg"
              alt="Electric Vehicle"
              width={400}
              height={200}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs text-gray-300 mb-1">KA 12 AB 1234</p>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Your EV Journey</h2>
                  <p className="text-sm text-gray-200">Powered by clean energy</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-teal-400">
                    <Zap className="w-4 h-4 mr-1" />
                    <span className="text-sm font-bold">Smart Charging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Vehicle Info */}
        <Card className="bg-gray-800/60 border-gray-700/50 backdrop-blur-sm overflow-hidden">
          <div 
            className="cursor-pointer"
            onClick={toggleVehicleCollapse}
          >
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg text-white mr-2">Tata Nexon EV Max</h3>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isVehicleCollapsed ? 'transform -rotate-90' : ''}`} 
                    />
                  </div>
                  {!isVehicleCollapsed && (
                    <div className="flex items-center text-sm text-gray-300 mt-1">
                      <Battery className="w-4 h-4 mr-1 text-teal-400" />
                      <span className="text-white font-semibold">78%</span>
                      <span className="mx-2">•</span>
                      <span>312 km range</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {!isVehicleCollapsed && (
                    <>
                      <p className="text-xs text-gray-400">Last charged</p>
                      <p className="text-sm font-medium text-white">2 hours ago</p>
                    </>
                  )}
                  <div className="flex items-center mt-1 justify-end">
                    <Sparkles className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-yellow-400">{rewardPoints} pts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Vehicle Stats */}
          <div 
            className={`px-5 pb-5 transition-all duration-200 ease-in-out ${isVehicleCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-96 opacity-100'}`}
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-700/30 rounded-lg p-2">
                <p className="text-xs text-gray-400">Efficiency</p>
                <p className="text-sm font-bold text-white">4.2 km/kWh</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2">
                <p className="text-xs text-gray-400">This Month</p>
                <p className="text-sm font-bold text-white">1,247 km</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2">
                <p className="text-xs text-gray-400">Saved CO₂</p>
                <p className="text-sm font-bold text-white">89 kg</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Wireless Charging Coming Soon */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                  <h3 className="font-semibold text-sm text-white">Introducing Wireless Charging</h3>
                </div>
                <p className="text-xs text-gray-200 mb-3">Experience the future of EV charging. No cables, no hassle. Coming soon to select locations.</p>
                <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-gray-200">Fast Charging</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-gray-200">Convenient</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-gray-200">Easy to Use</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-gray-200">No Cables Required</p>
                  </div>
                </div> 
                
                <div className="relative w-full h-0 pt-6" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full pb-4"
                    src="https://www.youtube-nocookie.com/embed/upVgwemoha0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <Button
                  size="sm"
                  className="w-full bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20"
                  onClick={() => handleJoinWaitlist()}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendation */}
        {aiRecommendations.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-white">{aiRecommendations[0].title}</h3>
                  <p className="text-xs text-gray-300">{aiRecommendations[0].description}</p>
                </div>
                <Button
                  size="sm"
                  className="bg-purple-500 hover:bg-purple-400 text-white text-xs"
                  onClick={() => setCurrentScreen("ai-recommendations")}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Charging Status */}
        {isCharging && (
          <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
            <Card className="bg-green-900 border-teal-500/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Currently Charging</span>
                  <Badge className="bg-green-500 text-black text-xs">Active</Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-white">Tata Power EZ Charge</span>
                  <span className="text-green-500 font-bold">{chargingProgress}%</span>
                </div>
                <Progress value={chargingProgress} className="h-1.5 bg-gray-600/50 mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${chargingProgress}%` }}
                  />
                </Progress>
                <div className="flex justify-between text-xs text-white mb-2">
                  <span>15 min remaining</span>
                  <span>₹125.50</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full text-xs h-8 bg-white/10 hover:bg-white/20 text-white border-white/20"
                  onClick={() => {
                    // TODO: Implement widget addition logic
                    toast({
                      title: "Added to Widget",
                      description: "Charging status is now available on your home screen",
                      duration: 3000,
                    });
                  }}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add to Widget
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white h-16 flex-col text-xs shadow-lg"
            onClick={() => setCurrentScreen("search")}
          >
            <Search className="w-5 h-5 mb-1" />
            Find Chargers
          </Button>
          <Button
            className="bg-gray-800/60 hover:bg-gray-700/60 text-white h-16 flex-col text-xs border border-gray-600/50"
            onClick={() => setCurrentScreen("route-planning")}
          >
            <Route className="w-5 h-5 mb-1" />
            Plan Route
          </Button>
        </div>

        {/* Chargers List */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Nearby Chargers</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen("search")}
            className="text-xs hover:bg-gray-700/50 text-gray-300"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {chargers.slice(0, 4).map((charger: any) => (
            <Card key={charger.id} className="bg-gray-800/60 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-sm text-white mr-2">{charger.name}</h3>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${charger.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {charger.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <Badge className={charger.status === "Available" ? "bg-green-500 text-xs" : "bg-yellow-500 text-xs"}>
                    {charger.available}/{charger.total}
                  </Badge>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {charger.features.slice(0, 3).map((feature: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs border-teal-400/50 text-teal-300">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                  <span>
                    {charger.distance} • {charger.price} • {charger.power}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    {charger.rating}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">Last charged: {charger.lastCharged}</p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-teal-500 hover:bg-teal-400 text-white text-xs h-8"
                    onClick={() => setCurrentScreen("booking")}
                  >
                    Book Now
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gray-700/60 hover:bg-gray-600/60 text-white text-xs h-8 border border-gray-600/50"
                    onClick={() => setCurrentScreen("map")}
                  >
                    <Navigation className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Extra padding for floating button */}
        <div className="h-20"></div>
      </div>

      {/* Voice Assistant Floating Button */}
    </div>
  )
}

function VoiceAssistantScreen({ setCurrentScreen }: any) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [ariaResponse, setAriaResponse] = useState("")
  const [conversationHistory, setConversationHistory] = useState([
    {
      type: "aria",
      message:
        "Hi! I'm Aria, your EV charging assistant. I can help you find chargers, schedule charging sessions, or answer any questions about your vehicle. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  const voiceCommands = [
    "Find nearest charging station",
    "Schedule charging for tonight",
    "Show my charging history",
    "Book a fast charger",
    "What's my battery status?",
    "Plan route to Mumbai",
    "Show charging costs",
    "Find 24/7 chargers nearby",
  ]

  const handleVoiceCommand = (command: string) => {
    const newUserMessage = {
      type: "user",
      message: command,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    let ariaReply = ""

    if (command.toLowerCase().includes("find") && command.toLowerCase().includes("charger")) {
      ariaReply =
        "I found 3 charging stations within 2km. Tata Power EZ Charge is closest at 0.2km with 8 available slots. Would you like me to book it for you?"
    } else if (command.toLowerCase().includes("schedule")) {
      ariaReply =
        "I can schedule your charging for tonight between 11 PM to 6 AM for maximum savings. This will save you ₹180 compared to day rates. Shall I proceed?"
    } else if (command.toLowerCase().includes("battery")) {
      ariaReply =
        "Your Tata Nexon EV Max is currently at 78% battery with 312km range remaining. Based on your usage pattern, you'll need charging in about 2 days."
    } else if (command.toLowerCase().includes("route")) {
      ariaReply =
        "I can plan an optimal route to Mumbai with 2 charging stops. The journey will take 4 hours 30 minutes including 45 minutes of charging time. Total cost: ₹450."
    } else if (command.toLowerCase().includes("cost")) {
      ariaReply =
        "Your average charging cost is ₹18 per kWh. This month you've spent ₹2,156 on charging. I can help you save 40% by scheduling night charging."
    } else {
      ariaReply =
        "I understand you're looking for charging assistance. Let me help you with that. Would you like me to find nearby chargers, schedule a charging session, or check your vehicle status?"
    }

    const newAriaMessage = {
      type: "aria",
      message: ariaReply,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setConversationHistory((prev) => [...prev, newUserMessage, newAriaMessage])
    setTranscript("")
  }

  const startListening = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)]
      setTranscript(randomCommand)
    }, 2000)
  }

  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentScreen("home")}
          className="mr-3 hover:bg-gray-700/50"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Aria Assistant</h1>
            <p className="text-gray-300 text-sm">Your EV charging companion</p>
          </div>
        </div>
      </div>

      {/* Conversation History */}
      <div className="flex-1 space-y-3 overflow-y-auto mb-4">
        {conversationHistory.map((message, index) => (
          <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-800/60 border border-gray-700/50 text-white"
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Voice Input Section */}
      <Card className="bg-gray-800/60 border-gray-700/50 mb-4">
        <CardContent className="p-4">
          <div className="text-center">
            <div
              className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isListening
                  ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
            </div>

            {isListening ? (
              <div>
                <p className="text-white font-semibold mb-2">Listening...</p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            ) : transcript ? (
              <div>
                <p className="text-gray-300 text-sm mb-2">You said:</p>
                <p className="text-white font-semibold mb-3">"{transcript}"</p>
                <Button
                  size="sm"
                  className="bg-teal-500 hover:bg-teal-400 text-white"
                  onClick={() => handleVoiceCommand(transcript)}
                >
                  Send to Aria
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-white font-semibold mb-2">Tap to speak with Aria</p>
                <p className="text-gray-400 text-xs">Ask about chargers, scheduling, or your vehicle</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voice Button */}
      <Button
        className={`w-full h-12 ${
          isListening
            ? "bg-red-500 hover:bg-red-400"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-500"
        } text-white font-semibold`}
        onClick={startListening}
        disabled={isListening}
      >
        {isListening ? "Listening..." : "Hold to Speak"}
      </Button>

      {/* Quick Commands */}
      <div className="mt-4">
        <p className="text-gray-400 text-xs mb-2">Quick commands:</p>
        <div className="flex flex-wrap gap-2">
          {voiceCommands.slice(0, 4).map((command, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="text-xs border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700/50"
              onClick={() => {
                setTranscript(command)
                handleVoiceCommand(command)
              }}
            >
              {command}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

function BookingScreen({ chargers, setCurrentScreen }: any) {
  const [selectedCharger, setSelectedCharger] = useState(chargers[0])
  const [selectedTime, setSelectedTime] = useState("now")
  const [chargingDuration, setChargingDuration] = useState(60)
  const [targetPercentage, setTargetPercentage] = useState(80)

  const estimatedCost = Math.round(
    (chargingDuration / 60) * 40 * Number.parseFloat(selectedCharger.price.replace("₹", "").replace("/kWh", "")),
  )

  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentScreen("home")}
          className="mr-3 hover:bg-gray-700/50"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <h1 className="text-xl font-bold text-white">Book Charger</h1>
      </div>

      {/* Selected Charger */}
      <Card className="bg-gray-800/60 border-gray-700/50 mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">{selectedCharger.name}</h3>
            <Badge className="bg-green-500">{selectedCharger.status}</Badge>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {selectedCharger.features.map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs border-teal-400/50 text-teal-300">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div>
              <p className="text-gray-400">Distance</p>
              <p className="text-white font-semibold">{selectedCharger.distance}</p>
            </div>
            <div>
              <p className="text-gray-400">Power</p>
              <p className="text-white font-semibold">{selectedCharger.power}</p>
            </div>
            <div>
              <p className="text-gray-400">Rate</p>
              <p className="text-white font-semibold">{selectedCharger.price}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charging Preferences */}
      <Card className="bg-gray-800/60 border-gray-700/50 mb-4">
        <CardContent className="p-4">
          <h3 className="font-semibold text-white mb-4">Charging Preferences</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Target Battery Level: {targetPercentage}%</label>
              <Slider
                value={[targetPercentage]}
                onValueChange={(value) => setTargetPercentage(value[0])}
                max={100}
                min={20}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Duration: {chargingDuration} minutes</label>
              <Slider
                value={[chargingDuration]}
                onValueChange={(value) => setChargingDuration(value[0])}
                max={180}
                min={15}
                step={15}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Summary */}
      <Card className="bg-gradient-to-r from-teal-900/40 to-blue-900/40 border-teal-500/30 mb-4">
        <CardContent className="p-4">
          <h3 className="font-semibold text-white mb-3">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Estimated Cost</span>
              <span className="text-white font-semibold">₹{estimatedCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Estimated Time</span>
              <span className="text-white font-semibold">{chargingDuration} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Reward Points</span>
              <span className="text-teal-400 font-semibold">+{Math.round(estimatedCost / 10)} pts</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-500 text-white"
          onClick={() => setCurrentScreen("payment-methods")}
        >
          Proceed to Payment - ₹{estimatedCost}
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-600 text-white bg-transparent hover:bg-gray-700/50"
          onClick={() => setCurrentScreen("home")}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

function RoutePlanningScreen({ setCurrentScreen }: any) {
  const [startLocation, setStartLocation] = useState("Current Location")
  const [endLocation, setEndLocation] = useState("")
  const [routeCalculated, setRouteCalculated] = useState(false)

  const suggestedRoutes = [
    {
      id: 1,
      name: "Fastest Route",
      duration: "2h 45m",
      distance: "180 km",
      chargingStops: 1,
      cost: "₹245",
      savings: "₹50",
      chargingTime: "25 min",
    },
    {
      id: 2,
      name: "Eco Route",
      duration: "3h 15m",
      distance: "195 km",
      chargingStops: 2,
      cost: "₹195",
      savings: "₹100",
      chargingTime: "40 min",
    },
  ]

  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">Smart Route Planning</h1>
      </div>

      <div className="flex-1 overflow-y-auto mt-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">From</label>
            <Input
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="bg-gray-800/60 border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">To</label>
            <Input
              placeholder="Enter destination"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              className="bg-gray-800/60 border-gray-600 text-white"
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-500 text-white"
            onClick={() => setRouteCalculated(true)}
          >
            <Route className="w-4 h-4 mr-2" />
            Calculate Smart Route
          </Button>
        </div>

        {routeCalculated && (
          <div className="space-y-3 mt-4 overflow-y-auto">
            {suggestedRoutes.map((route) => (
              <Card key={route.id} className="bg-gray-800/60 border-gray-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm text-white">{route.name}</h3>
                    <div className="text-right">
                      <Badge className="bg-teal-400 text-black text-xs">{route.cost}</Badge>
                      <p className="text-xs text-green-400 mt-1">Save {route.savings}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {route.duration}
                    </div>
                    <div className="flex items-center">
                      <Navigation className="w-3 h-3 mr-1" />
                      {route.distance}
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      {route.chargingStops} stops
                    </div>
                    <div className="flex items-center">
                      <Battery className="w-3 h-3 mr-1" />
                      {route.chargingTime}
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-teal-500 hover:bg-teal-400 text-white text-xs">
                    Start Navigation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SettingsScreen({ setCurrentScreen }: any) {
  const [autoCharge, setAutoCharge] = useState(true)
  const [chargingLimit, setChargingLimit] = useState(80)
  const [preferredTime, setPreferredTime] = useState("night")
  const [ecoMode, setEcoMode] = useState(false)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pt-12">
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentScreen("profile")}
            className="mr-3 hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-xl font-bold text-white">Charging Settings</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <Card className="bg-gray-800/60 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Smart Charging</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Auto-start Charging</span>
                <p className="text-xs text-gray-400">Start charging when plugged in</p>
              </div>
              <Switch checked={autoCharge} onCheckedChange={setAutoCharge} />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Default Charging Limit: {chargingLimit}%</label>
              <Slider
                value={[chargingLimit]}
                onValueChange={(value) => setChargingLimit(value[0])}
                max={100}
                min={20}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">Recommended: 80% for daily use</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white">Eco Mode</span>
                <p className="text-xs text-gray-400">Optimize for cost savings</p>
              </div>
              <Switch checked={ecoMode} onCheckedChange={setEcoMode} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Preferred Charging Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={preferredTime === "night" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreferredTime("night")}
                className={
                  preferredTime === "night"
                    ? "bg-teal-500 text-white"
                    : "border-gray-600 text-white bg-transparent hover:bg-gray-700/50"
                }
              >
                Night (11 PM - 6 AM)
              </Button>
              <Button
                variant={preferredTime === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreferredTime("day")}
                className={
                  preferredTime === "day"
                    ? "bg-teal-500 text-white"
                    : "border-gray-600 text-white bg-transparent hover:bg-gray-700/50"
                }
              >
                Day (6 AM - 6 PM)
              </Button>
            </div>
            <p className="text-xs text-gray-400">Night charging saves up to 40% on electricity costs</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/60 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Charging Complete</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Low Battery Alert</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Optimal Charging Times</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AnalyticsScreen({ setCurrentScreen }: any) {
  const chartData = [
    { day: "Mon", kwh: 50 },
    { day: "Tue", kwh: 70 },
    { day: "Wed", kwh: 60 },
    { day: "Thu", kwh: 80 },
    { day: "Fri", kwh: 90 },
    { day: "Sat", kwh: 120 },
    { day: "Sun", kwh: 100 },
  ]

  const totalKwh = 1247 // From previous state
  const totalSpent = 2156 // From previous state
  const kwhPerRupee = 4.2 // (totalKwh / totalSpent).toFixed(2) // Calculate kWh per Rupee

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pt-12">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentScreen("profile")}
            className="mr-3 hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-teal-800 border-teal-500/30">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-xs text-gray-300">kWh This Month</p>
              </CardContent>
            </Card>
            <Card className="bg-green-800 border-green-500/30">
              <CardContent className="p-4 text-center">
                <IndianRupee className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">₹2,156</p>
                <p className="text-xs text-gray-300">Total Spent</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-purple-800 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-xs text-gray-300">Charging Sessions</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-800 border-yellow-500/30">
              <CardContent className="p-4 text-center">
                <Battery className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{kwhPerRupee}</p>
                <p className="text-xs text-gray-300">km/kWh</p>
              </CardContent>
            </Card>
          </div>

          {/* Charging Pattern */}
          <Card className="bg-gray-800/60 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Charging Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  kwh: {
                    label: "kWh",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      className="text-xs text-gray-400"
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-gray-400" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                      dataKey="kwh"
                      type="monotone"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{
                        fill: "hsl(var(--chart-1))",
                      }}
                      activeDot={{
                        r: 6,
                        fill: "hsl(var(--chart-1))",
                        stroke: "hsl(var(--chart-1))",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid grid-cols-3 gap-3 text-center text-sm mt-4">
                <div>
                  <p className="text-gray-400">Peak Hours</p>
                  <p className="text-white font-semibold">8-10 PM</p>
                </div>
                <div>
                  <p className="text-gray-400">Avg. Session</p>
                  <p className="text-white font-semibold">45 min</p>
                </div>
                <div>
                  <p className="text-gray-400">Efficiency</p>
                  <p className="text-white font-semibold">92%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-800/60 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <div className="p-2 bg-teal-500/10 rounded-full">
                      <Zap className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">Charging Session Completed</p>
                      <p className="text-xs text-gray-400">Added 32.5 kWh • 45 minutes ago</p>
                    </div>
                    <p className="text-sm font-medium text-teal-400">+₹585</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function RewardsScreen({ setCurrentScreen, rewardPoints }: any) {
  const rewards = [
    { id: 1, name: "Free 30-min Charging", points: 500, available: true },
    { id: 2, name: "₹100 Charging Credit", points: 1000, available: true },
    { id: 3, name: "Premium Membership (1 month)", points: 2000, available: true },
    { id: 4, name: "₹500 Charging Credit", points: 5000, available: false },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pt-12">
        <div className="flex items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentScreen("home")}
            className="mr-3 hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-xl font-bold text-white">EV Rewards</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Points Balance */}
        <Card className="bg-yellow-900/30 border-yellow-500/30">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">{rewardPoints}</p>
            <p className="text-gray-300">Reward Points</p>
            <p className="text-xs text-gray-400 mt-2">Earn points with every charge!</p>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <h2 className="text-lg font-semibold text-white">Available Rewards</h2>
        <div className="space-y-3">
          {rewards.map((reward) => (
            <Card key={reward.id} className="bg-gray-800/60 border-gray-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{reward.name}</h3>
                    <div className="flex items-center mt-1">
                      <Sparkles className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{reward.points} points</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    disabled={!reward.available || rewardPoints < reward.points}
                    className={
                      reward.available && rewardPoints >= reward.points
                        ? "bg-teal-500 hover:bg-teal-400 text-white"
                        : "bg-gray-600 text-gray-400"
                    }
                  >
                    {reward.available && rewardPoints >= reward.points ? "Redeem" : "Locked"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Earn */}
        <Card className="bg-gray-800/60 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Complete charging session</span>
              <span className="text-teal-400">+10 pts per ₹100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Rate charging station</span>
              <span className="text-teal-400">+50 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Refer a friend</span>
              <span className="text-teal-400">+500 pts</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AIRecommendationsScreen({ setCurrentScreen, recommendations }: any) {
  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentScreen("home")}
          className="mr-3 hover:bg-gray-700/50"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <h1 className="text-xl font-bold text-white">AI Recommendations</h1>
      </div>

      <div className="space-y-4 overflow-y-auto">
        {recommendations.map((rec: any) => {
          const Icon = rec.icon
          return (
            <Card key={rec.id} className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500/60 to-purple-500/80 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black mb-1">{rec.title}</h3>
                    <p className="text-sm text-black mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-500 text-xs">{rec.savings}</Badge>
                      <Button size="sm" className="bg-purple-500 hover:bg-purple-400 text-white text-xs">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* AI Insights */}
        <Card className="bg-gray-800/60 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-gray-300">You charge most efficiently between 11 PM - 6 AM</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Your driving pattern suggests 80% charge is optimal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300">Tata Power EZ Charge gives you best value on your route</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PaymentMethodsScreen({ setCurrentScreen }: any) {
  const [selectedMethod, setSelectedMethod] = useState("upi")

  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <div className="sticky top-0 z-10 flex items-center bg-gray-900 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentScreen("booking")}
          className="mr-3 hover:bg-gray-700/50"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <h1 className="text-xl font-bold text-white">Payment Methods</h1>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-24rem)]">
        {/* UPI Payment */}
        <Card
          className={`bg-gray-800/60 border-gray-700/50 cursor-pointer ${selectedMethod === "upi" ? "ring-2 ring-teal-400" : ""}`}
          onClick={() => setSelectedMethod("upi")}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <QrCode className="w-6 h-6 text-teal-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">UPI Payment</h3>
                <p className="text-sm text-gray-400">Pay using any UPI app</p>
              </div>
              <Badge className="bg-green-500 text-xs">Instant</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Credit/Debit Card */}
        <Card
          className={`bg-gray-800/60 border-gray-700/50 cursor-pointer ${selectedMethod === "card" ? "ring-2 ring-teal-400" : ""}`}
          onClick={() => setSelectedMethod("card")}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">Credit/Debit Card</h3>
                <p className="text-sm text-gray-400">Visa, Mastercard, RuPay</p>
              </div>
              <Badge className="bg-blue-500 text-xs">Secure</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Digital Wallet */}
        <Card
          className={`bg-gray-800/60 border-gray-700/50 cursor-pointer ${selectedMethod === "wallet" ? "ring-2 ring-teal-400" : ""}`}
          onClick={() => setSelectedMethod("wallet")}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Wallet className="w-6 h-6 text-purple-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">Digital Wallet</h3>
                <p className="text-sm text-gray-400">Paytm, PhonePe, Google Pay</p>
              </div>
              <Badge className="bg-purple-500 text-xs">Fast</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Net Banking */}
        <Card
          className={`bg-gray-800/60 border-gray-700/50 cursor-pointer ${selectedMethod === "netbanking" ? "ring-2 ring-teal-400" : ""}`}
          onClick={() => setSelectedMethod("netbanking")}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Banknote className="w-6 h-6 text-green-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">Net Banking</h3>
                <p className="text-sm text-gray-400">All major banks supported</p>
              </div>
              <Badge className="bg-green-500 text-xs">Reliable</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      <Card className="bg-teal-900/40 border-teal-500/30 mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-white mb-3">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Charging Cost</span>
              <span className="text-white">₹245.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Platform Fee</span>
              <span className="text-white">₹5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">GST (18%)</span>
              <span className="text-white">₹45.00</span>
            </div>
            <hr className="border-gray-600" />
            <div className="flex justify-between font-semibold">
              <span className="text-white">Total Amount</span>
              <span className="text-teal-400">₹295.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-500 text-white"
        onClick={() => setCurrentScreen("home")}
      >
        Pay ₹295.00 & Book Charger
      </Button>
    </div>
  )
}

function SearchScreen({ chargers, setCurrentScreen }: any) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <h1 className="text-xl font-bold mb-4 text-white">Find Chargers</h1>

      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800/60 border-gray-600 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className={
              filterType === "all" ? "bg-teal-500 text-white" : "bg-gray-700/60 text-white hover:bg-gray-600/60"
            }
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            className={
              filterType === "fast" ? "bg-teal-500 text-white" : "bg-gray-700/60 text-white hover:bg-gray-600/60"
            }
            onClick={() => setFilterType("fast")}
          >
            Fast
          </Button>
          <Button
            size="sm"
            className={
              filterType === "available" ? "bg-teal-500 text-white" : "bg-gray-700/60 text-white hover:bg-gray-600/60"
            }
            onClick={() => setFilterType("available")}
          >
            Available
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {chargers.map((charger: any) => (
          <Card key={charger.id} className="bg-gray-800/60 border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm text-white">{charger.name}</h3>
                <Badge className={charger.status === "Available" ? "bg-green-500 text-xs" : "bg-yellow-500 text-xs"}>
                  {charger.available}/{charger.total}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {charger.features.slice(0, 3).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-teal-400/50 text-teal-300">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 mb-3">
                <span>
                  {charger.distance} • {charger.price} • {charger.power}
                </span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  {charger.rating}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3">Last charged: {charger.lastCharged}</p>

              <Button
                size="sm"
                className="w-full bg-teal-500 hover:bg-teal-400 text-white text-xs"
                onClick={() => setCurrentScreen("booking")}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MapScreen({ chargers, setCurrentScreen }: any) {
  return (
    <div className="flex-1 flex flex-col p-4 pt-12 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">Map View</h1>
        <Button
          size="sm"
          className="bg-teal-500 hover:bg-teal-400 text-white text-xs"
          onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=EV+Charging+Stations+near+me", "_blank")}
        >
          <Navigation className="w-3 h-3 mr-1" />
          Navigate
        </Button>
      </div>

      <div className="bg-gray-800/60 rounded-lg flex-1 mb-4 flex items-center justify-center">
        <div className="text-center">
          <img src="/ev-map-1.png" alt="Google Maps" className="max-w-[420px] h-[280px]" />
          {/* <p className="text-gray-300">Interactive map</p> */}
          <p className="text-xs text-gray-400">{chargers.length} nearby chargers</p>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {chargers.map((charger: any) => (
          <Card key={charger.id} className="bg-gray-800/60 border-gray-700/50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm text-white">{charger.name}</h3>
                <Badge className={charger.status === "Available" ? "bg-green-500 text-xs" : "bg-yellow-500 text-xs"}>
                  {charger.available}/{charger.total}
                </Badge>
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {charger.features.slice(0, 3).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-teal-400/50 text-teal-300">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                <span>
                  {charger.distance} • {charger.price} • {charger.power}
                </span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  {charger.rating}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3">Last charged: {charger.lastCharged}</p>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-400 text-white text-xs">
                  Directions
                </Button>
                <Button
                  size="sm"
                  className="bg-gray-700/60 hover:bg-gray-600/60 text-white text-xs border border-gray-600/50"
                  onClick={() => setCurrentScreen("booking")}
                >
                  Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function BottomNavigation({ currentScreen, setCurrentScreen }: any) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "map", icon: MapPin, label: "Map" },
    { id: "charging", icon: Zap, label: "Charge" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="border-t border-gray-700/50 px-2 py-2" style={{ backgroundColor: "#141F1C" }}>
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className="flex flex-col items-center py-1 px-3 rounded-lg hover:bg-gray-700/30 transition-colors"
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-teal-400" : "text-gray-400"}`} />
              <span className={`text-xs mt-1 ${isActive ? "text-teal-400" : "text-gray-400"}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChargingScreen({ isCharging, setIsCharging, chargingProgress, setCurrentScreen }: any) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second for realistic charging experience
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const chargingActivities = [
    {
      id: 1,
      title: "Grab a Coffee",
      description: "Starbucks is 2 minutes away",
      duration: "15 min",
      icon: Coffee,
      distance: "2 min walk",
    },
    {
      id: 2,
      title: "Quick Shopping",
      description: "Reliance Digital nearby",
      duration: "20 min",
      icon: ShoppingBag,
      distance: "5 min walk",
    },
    {
      id: 3,
      title: "Lunch Break",
      description: "McDonald's around the corner",
      duration: "25 min",
      icon: Utensils,
      distance: "3 min walk",
    },
    {
      id: 4,
      title: "Stretch & Walk",
      description: "Small park nearby for a quick walk",
      duration: "10 min",
      icon: MapPin,
      distance: "1 min walk",
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pt-12">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentScreen("home")}
            className="mr-3 hover:bg-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Charging Status</h1>
            <p className="text-gray-300 text-sm">Tata Power EZ Charge - Station 4</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
        {/* Animated Charging Display */}
        <div className="bg-gray-800/60 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-4">
              {/* Animated charging ring */}
              <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-400 animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
              <div className="absolute inset-2 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Battery className="w-8 h-8 text-white" />
              </div>
              {/* Charging bolt animation */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-3 h-3 text-black" />
              </div>
            </div>

            <div className="text-4xl font-bold text-teal-400 mb-2 animate-pulse">{chargingProgress}%</div>
            <p className="text-gray-300">Battery Level</p>
            <p className="text-xs text-gray-400 mt-1">{currentTime.toLocaleTimeString()}</p>
          </div>

          {/* Animated Progress Bar */}
          <div className="relative mb-4">
            <Progress value={chargingProgress} className="h-3 bg-gray-600">
              <div
                className="h-full bg-gradient-to-r from-teal-400 via-green-400 to-teal-400 rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ width: `${chargingProgress}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </Progress>
            {/* Progress indicators */}
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-700/30 rounded-lg p-3">
              <p className="text-lg font-bold text-white animate-pulse">15</p>
              <p className="text-xs text-gray-400">Minutes Left</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-3">
              <p className="text-lg font-bold text-white">₹125.50</p>
              <p className="text-xs text-gray-400">Current Cost</p>
            </div>
          </div>
        </div>

        {/* Charging Details */}
        <Card className="bg-gray-800/60 border-gray-700/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Power Output</span>
              <span className="text-teal-400 font-semibold">150 kW</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Energy Added</span>
              <span className="text-white font-semibold">45.2 kWh</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Session Time</span>
              <span className="text-white font-semibold">32 minutes</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Charging Speed</span>
              <span className="text-green-400 font-semibold">Fast</span>
            </div>
          </CardContent>
        </Card>

        {/* Things to Do While Charging */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Things to do while charging</h3>
          <div className="space-y-3">
            {chargingActivities.map((activity) => (
              <Card key={activity.id} className="bg-gray-800/60 border-gray-700/50">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-white">{activity.title}</h4>
                      <p className="text-xs text-gray-400">{activity.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{activity.duration}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.distance}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-white text-xs">
                      Go
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            className="w-full bg-teal-500 hover:bg-teal-400 text-white"
            onClick={() => setCurrentScreen("amenities")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Explore Nearby Places
          </Button>
          <Button className="w-full bg-red-500 hover:bg-red-400" onClick={() => setIsCharging(false)}>
            <Zap className="w-4 h-4 mr-2" />
            Stop Charging
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProfileScreen({ setCurrentScreen, rewardPoints }: any) {

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pt-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">Sandeep Hati</h1>
          <p className="text-gray-300 text-sm">sandeep.hati@gmail.com</p>
          <div className="flex items-center justify-center mt-2">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-yellow-400 font-semibold">{rewardPoints} points</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          <Card className="bg-gray-800/60 border-gray-700/50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm text-white">Vehicle Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Model</span>
                  <span className="text-white">Tata Nexon EV Max</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Battery</span>
                  <span className="text-white">40.5 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Range</span>
                  <span className="text-white">437 km</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button
              className="w-full justify-start bg-gray-800/60 text-white hover:bg-gray-700/60 text-sm border border-gray-600/50"
              onClick={() => setCurrentScreen("settings")}
            >
              <Settings className="w-4 h-4 mr-3" />
              Charging Settings
            </Button>
            <Button
              className="w-full justify-start bg-gray-800/60 text-white hover:bg-gray-700/60 text-sm border border-gray-600/50"
              onClick={() => setCurrentScreen("analytics")}
            >
              <TrendingUp className="w-4 h-4 mr-3" />
              Analytics Dashboard
            </Button>
            <Button
              className="w-full justify-start bg-gray-800/60 text-white hover:bg-gray-700/60 text-sm border border-gray-600/50"
              onClick={() => setCurrentScreen("rewards")}
            >
              <Gift className="w-4 h-4 mr-3" />
              Rewards & Offers
            </Button>
            <Button
              className="w-full justify-start bg-gray-800/60 text-white hover:bg-gray-700/60 text-sm border border-gray-600/50"
              onClick={() => setCurrentScreen("payment-methods")}
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Payment Methods
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
