"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-[1400px]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always know what you&apos;ll pay.
        </p>
      </div>

      <div className="mb-16">
        <Tabs defaultValue="monthly" className="w-full mx-auto mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annually">
              Annually <Badge className="ml-2 bg-primary/20 text-primary">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 mt-8 max-w-7xl mx-auto">{renderPricingCards(false)}</div>
          </TabsContent>
          <TabsContent value="annually">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-8 mt-8 max-w-7xl mx-auto">{renderPricingCards(true)}</div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6 font-medium">Features</th>
                <th className="text-center py-4 px-6 font-medium">Free</th>
                <th className="text-center py-4 px-6 font-medium">Pro</th>
                <th className="text-center py-4 px-6 font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-6">Projects</td>
                <td className="text-center py-4 px-6">3</td>
                <td className="text-center py-4 px-6">Unlimited</td>
                <td className="text-center py-4 px-6">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Team members</td>
                <td className="text-center py-4 px-6">1</td>
                <td className="text-center py-4 px-6">10</td>
                <td className="text-center py-4 px-6">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Storage</td>
                <td className="text-center py-4 px-6">5 GB</td>
                <td className="text-center py-4 px-6">100 GB</td>
                <td className="text-center py-4 px-6">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">API requests</td>
                <td className="text-center py-4 px-6">10K / month</td>
                <td className="text-center py-4 px-6">100K / month</td>
                <td className="text-center py-4 px-6">Custom</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Analytics</td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Priority support</td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">Custom domain</td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-6">SSO</td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6">Dedicated account manager</td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <X className="mx-auto text-muted-foreground" size={20} />
                </td>
                <td className="text-center py-4 px-6">
                  <Check className="mx-auto text-primary" size={20} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does billing work?</AccordionTrigger>
            <AccordionContent>
              We offer both monthly and annual billing options. You can change your billing cycle at any time from your
              account settings. Annual plans come with a 20% discount.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
            <AccordionContent>
              Yes, you can upgrade or downgrade your plan at any time. When upgrading, you&apos;ll be prorated for the
              remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next
              billing cycle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer a 14-day free trial on our Pro plan. No credit card is required to start your trial. You can
              upgrade to a paid plan at any time during or after your trial.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we
              also offer invoicing with net-30 payment terms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is there a setup fee?</AccordionTrigger>
            <AccordionContent>
              No, there are no setup fees for any of our plans. You only pay the advertised price for your subscription.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team is here to help. Contact us and we&apos;ll get back to you as soon as possible.
        </p>
        <Button size="lg" className="mr-4">
          Contact Sales
        </Button>
        <Button size="lg" variant="outline">
          View Documentation
        </Button>
      </div>
    </div>
  )
}

function renderPricingCards(isAnnual) {
  const discount = 0.8 // 20% discount for annual billing

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Free</CardTitle>
          <CardDescription>For individuals and small projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted-foreground ml-1">/ month</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>3 projects</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>5 GB storage</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>10K API requests / month</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Community support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            Get Started
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-primary shadow-md relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
        <CardHeader>
          <CardTitle>Pro</CardTitle>
          <CardDescription>For professionals and growing teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold">${isAnnual ? Math.round(29 * discount) : 29}</span>
            <span className="text-muted-foreground ml-1">/ month</span>
            {isAnnual && <span className="text-xs ml-2 text-primary">billed annually</span>}
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Unlimited projects</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>100 GB storage</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>100K API requests / month</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Analytics dashboard</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Custom domain</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Start 14-day Free Trial</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <CardDescription>For large organizations with custom needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold">${isAnnual ? Math.round(99 * discount) : 99}</span>
            <span className="text-muted-foreground ml-1">/ month</span>
            {isAnnual && <span className="text-xs ml-2 text-primary">billed annually</span>}
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Unlimited storage</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Custom API request limits</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>SSO authentication</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Dedicated account manager</span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span>Custom SLA</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            Contact Sales
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

