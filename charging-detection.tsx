import { ArrowLeft, Home, MapPin, Zap, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function Component() {
  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 pt-12">
        <ArrowLeft className="w-6 h-6 mr-4" />
        <h1 className="text-lg font-medium">Charge Detection</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4">
        {/* Vehicle Title */}
        <h2 className="text-3xl font-bold mb-6">Volkswagen ID.4</h2>

        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed mb-8">
          Your vehicle has been detected on the charging spot. Charging will begin automatically in 10 seconds.
        </p>

        {/* Charging Status */}
        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-3">Initiating Charge</p>
          <Progress value={25} className="h-2 bg-gray-700">
            <div className="h-full bg-teal-400 rounded-full transition-all duration-300" style={{ width: "25%" }} />
          </Progress>
        </div>

        {/* Vehicle Image */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <div className="aspect-[4/3] bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src="/volkswagen-id4.png"
              alt="Volkswagen ID.4 electric vehicle"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Start Charging Button */}
        <Button
          className="w-full bg-teal-400 hover:bg-teal-500 text-black font-medium py-4 rounded-lg text-base"
          size="lg"
        >
          Start Charging Now
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-700 bg-slate-800">
        <div className="flex items-center justify-around py-3">
          <div className="flex flex-col items-center py-2">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <MapPin className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Maps</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <Zap className="w-6 h-6 text-teal-400" />
            <span className="text-xs text-teal-400 mt-1">Charge</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Account</span>
          </div>
        </div>
      </div>
    </div>
  )
}
