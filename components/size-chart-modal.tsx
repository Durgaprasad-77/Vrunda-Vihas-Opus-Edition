import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Ruler } from "lucide-react"

export function SizeChartModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-sans text-sm text-primary gap-2 h-auto p-0">
          <Ruler className="h-4 w-4" />
          Size Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Blouse Size Chart</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-left font-semibold">Size</th>
                  <th className="py-3 px-4 text-center font-semibold">Bust (inches)</th>
                  <th className="py-3 px-4 text-center font-semibold">Waist (inches)</th>
                  <th className="py-3 px-4 text-center font-semibold">Hip (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">32</td>
                  <td className="py-3 px-4 text-center">32</td>
                  <td className="py-3 px-4 text-center">26</td>
                  <td className="py-3 px-4 text-center">35</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">34</td>
                  <td className="py-3 px-4 text-center">34</td>
                  <td className="py-3 px-4 text-center">28</td>
                  <td className="py-3 px-4 text-center">37</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">36</td>
                  <td className="py-3 px-4 text-center">36</td>
                  <td className="py-3 px-4 text-center">30</td>
                  <td className="py-3 px-4 text-center">39</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">38</td>
                  <td className="py-3 px-4 text-center">38</td>
                  <td className="py-3 px-4 text-center">32</td>
                  <td className="py-3 px-4 text-center">41</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium">40</td>
                  <td className="py-3 px-4 text-center">40</td>
                  <td className="py-3 px-4 text-center">34</td>
                  <td className="py-3 px-4 text-center">43</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">42</td>
                  <td className="py-3 px-4 text-center">42</td>
                  <td className="py-3 px-4 text-center">36</td>
                  <td className="py-3 px-4 text-center">45</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-secondary rounded-sm">
            <h4 className="font-semibold mb-2">How to Measure</h4>
            <ul className="font-sans text-sm text-muted-foreground space-y-1">
              <li>
                <strong>Bust:</strong> Measure around the fullest part of your bust
              </li>
              <li>
                <strong>Waist:</strong> Measure around your natural waistline
              </li>
              <li>
                <strong>Hip:</strong> Measure around the fullest part of your hips
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
