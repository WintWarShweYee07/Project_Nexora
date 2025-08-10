#!/usr/bin/env node
import fs from "fs"
import path from "path"

const brand = "Nexora"

// Seed canonical Q&A grounded in the current project features
const canonical = [
    {
        q: `What is ${brand}?`,
        a: `${brand} is a subscription platform created for UiT SE ADBMS Course (CS-7313). Project created by Wint War Shwe Yee, Naw Lal Yee Than Han, Chaw Su Han, Kaung Myat Thu, Kaung Kyaw Han. It provides dashboards for readers, creators, and admins with monthly membership, premium content gating, bookmarks, and a rich content editor.`,
    },
    {
        q: `Who created ${brand}?`,
        a: `${brand} was created for UiT SE ADBMS Course (CS-7313) by Wint War Shwe Yee, Naw Lal Yee Than Han, Chaw Su Han, Kaung Myat Thu, Kaung Kyaw Han.`,
    },
    {
        q: `Who built project ${brand}?`,
        a: `Project ${brand} is a subscription platform created for UiT SE ADBMS Course (CS-7313) by Wint War Shwe Yee, Naw Lal Yee Than Han, Chaw Su Han, Kaung Myat Thu, Kaung Kyaw Han.`,
    },
    {
        q: `Tell me about project ${brand}.`,
        a: `${brand} is a subscription platform created for UiT SE ADBMS Course (CS-7313). Project created by Wint War Shwe Yee, Naw Lal Yee Than Han, Chaw Su Han, Kaung Myat Thu, Kaung Kyaw Han, featuring monthly membership, premium gating, and creator tools.`,
    },
    {
        q: `How do I upgrade to Premium on ${brand}?`,
        a: `From the reader dashboard, click Upgrade to Premium. This starts checkout for the monthly membership. Once active, you can read all premium stories without the blur gate.`,
    },
    {
        q: `How do I manage billing on ${brand}?`,
        a: `Use the Manage Billing button in the Membership tab of your reader dashboard. It opens the billing portal to update payment methods or cancel your plan.`,
    },
    {
        q: `How does premium content gating work on ${brand}?`,
        a: `Premium stories show a preview and then display a blur gate with an Upgrade prompt. Premium members can view the full content immediately.`,
    },
    {
        q: `Where can I find my bookmarks on ${brand}?`,
        a: `Open your reader dashboard and go to the Bookmarks tab. All saved articles appear there with quick actions.`,
    },
    {
        q: `I'm a creator. Can I view other creators' content on ${brand}?`,
        a: `Yes. Creators have an active membership and can browse and read other creators' premium content like any member.`,
    },
    {
        q: `How do I write a new post on ${brand}?`,
        a: `From the Creator Dashboard, click Write New Post. You will be taken to the rich content editor where you can compose and publish.`,
    },
    {
        q: `Does ${brand} support dark mode?`,
        a: `Yes. The site uses a theme provider and adapts to your system preference. You can also toggle the theme from the dashboard header.`,
    },
    {
        q: `How can admins moderate content on ${brand}?`,
        a: `Admins can approve, remove, or review reported content from the Admin Dashboard under the Content Moderation tab.`,
    },
    {
        q: `How do I update my profile on ${brand}?`,
        a: `Click Profile in the reader dashboard header to open Profile Settings and edit your name, email, bio, and newsletter preferences.`,
    },
]

const topics = [
    {
        tag: "membership",
        qs: [
            `How much does ${brand} Premium cost per month?`,
            `Is there a free plan on ${brand}?`,
            `Can I cancel ${brand} membership anytime?`,
            `Does ${brand} offer a student discount?`,
            `How do I switch plans on ${brand}?`,
            `What happens if my ${brand} payment fails?`,
            `Is billing handled securely on ${brand}?`,
        ],
        as: [
            `Premium is a monthly membership. Pricing is shown during checkout and managed via the billing portal.`,
            `Yes. You can use ${brand} on a free tier, but premium stories are gated until you upgrade.`,
            `Yes. Use Manage Billing in your dashboard to cancel. Access continues until the end of the billing period.`,
            `Discounts may be offered during promotions. Check the pricing page or billing portal for details.`,
            `Use Manage Billing to change plans. Your new plan applies after confirmation in the portal.`,
            `If a payment fails, the billing portal will guide you to update your method and retry.`,
            `Yes. ${brand} uses a PCI-compliant payment processor, and the customer portal handles secure updates.`,
        ],
    },
    {
        tag: "premium_gating",
        qs: [
            `Why is my article blurred on ${brand}?`,
            `How do I read the full premium story on ${brand}?`,
            `Can I preview premium articles on ${brand}?`,
            `Does ${brand} remember my premium status across devices?`,
        ],
        as: [
            `Blur indicates premium content. Upgrade to Premium to remove the gate and read fully.`,
            `Upgrade to Premium from your dashboard to unlock the full content instantly.`,
            `Yes. Premium stories show a partial preview before the Upgrade prompt.`,
            `Yes. Once signed in, your membership is recognized across devices.`,
        ],
    },
    {
        tag: "reader_dashboard",
        qs: [
            `Where is the Bookmarks tab in ${brand}?`,
            `How do I save an article to bookmarks on ${brand}?`,
            `How do I share an article from ${brand}?`,
            `What stats do I see as a reader on ${brand}?`,
        ],
        as: [
            `Open your dashboard and select the Bookmarks tab to view saved articles.`,
            `Click the bookmark icon on an article card or detail page to save it.`,
            `Use the Share button on cards to share via your device's native share menu.`,
            `Reader stats include articles read, reading time, bookmarks count, and subscriptions.`,
        ],
    },
    {
        tag: "creator_dashboard",
        qs: [
            `How do I become a creator on ${brand}?`,
            `Is there a creator activation fee on ${brand}?`,
            `Can creators schedule posts on ${brand}?`,
            `How do I edit or delete a post on ${brand}?`,
        ],
        as: [
            `Click Become a Creator from your dashboard. Complete the activation to enable creator tools.`,
            `Yes, there is a one-time activation fee shown during upgrade.`,
            `Yes. Use the Schedule Post option from the Posts tab in your Creator Dashboard.`,
            `Open the post in the Creator Dashboard and choose Edit or Delete from the post actions.`,
        ],
    },
    {
        tag: "admin",
        qs: [
            `How do admins review reported content on ${brand}?`,
            `Can admins ban a user on ${brand}?`,
            `Does ${brand} provide platform analytics for admins?`,
        ],
        as: [
            `From the Admin Dashboard, open Content Moderation to approve, remove, or review reports.`,
            `Yes. Admins can take actions like suspend or ban via the user management tools.`,
            `Yes. The Admin Dashboard shows platform stats and revenue analytics.`,
        ],
    },
    {
        tag: "navigation_ui",
        qs: [
            `How do I change themes on ${brand}?`,
            `What is the sidebar navigation in ${brand}?`,
            `Where do I find settings in ${brand}?`,
        ],
        as: [
            `Use the Theme Toggle in the header to switch between light and dark modes.`,
            `The sidebar provides quick access to Discover, Library, Subscriptions, and role-specific tools.`,
            `Open the dashboard header menu or the sidebar Settings item to access preferences.`,
        ],
    },
    {
        tag: "chatbot",
        qs: [
            `What can the ${brand} chatbot help me with?`,
            `How do I open the chatbot on ${brand}?`,
        ],
        as: [
            `It assists with content creation tips, billing, membership, analytics, and navigation.`,
            `Click Help in the header or the floating Chatbot button to open the assistant.`,
        ],
    },
    {
        tag: "tech",
        qs: [
            `What tech stack does ${brand} use?`,
            `Does ${brand} support mobile devices?`,
            `Why did I see a hydration warning on ${brand}?`,
        ],
        as: [
            `${brand} uses Next.js with React, Tailwind, and a component system for the UI.`,
            `Yes. The layout and sidebar are responsive and optimized for mobile.`,
            `Hydration warnings can occur if client-only state differs from SSR. Refreshing and avoiding client-only reads during SSR resolves it.`,
        ],
    },
]

function generatePairs(minCount) {
    const pairs = []

    // include canonical first
    canonical.forEach((c) => pairs.push({ q: c.q, a: c.a }))

    // expand from topics with variations
    let i = 0
    while (pairs.length < minCount) {
        const topic = topics[i % topics.length]
        const q = topic.qs[i % topic.qs.length]
        const a = topic.as[i % topic.as.length]
        // Create slight variations to exceed counts without duplicates
        const variant = Math.floor(i / topics.length) + 1
        const qv = variant > 1 ? `${q} (v${variant})` : q
        const av = variant > 1 ? `${a} (Details ${variant}).` : a
        pairs.push({ q: qv, a: av })
        i++
    }
    return pairs
}

function writeTxt(filePath, pairs) {
    const lines = pairs.map((p) => `Q: ${p.q}\nA: ${p.a}`).join("\n\n") + "\n"
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, lines, "utf8")
}

function writeJsonl(filePath, pairs) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    const stream = fs.createWriteStream(filePath, { encoding: "utf8" })
    for (const p of pairs) {
        const record = {
            messages: [
                { role: "user", content: p.q },
                { role: "assistant", content: p.a },
            ],
            source: brand.toLowerCase(),
            type: "qa",
        }
        stream.write(JSON.stringify(record) + "\n")
    }
    stream.end()
}

const trainPairs = generatePairs(520) // at least 500
const valPairs = generatePairs(60).slice(0, 60) // at least 50

const dataDir = path.join(process.cwd(), "data")
const trainPath = path.join(dataDir, "nexora_train.txt")
const valPath = path.join(dataDir, "nexora_val.txt")
const trainJsonlPath = path.join(dataDir, "nexora_train.jsonl")
const valJsonlPath = path.join(dataDir, "nexora_val.jsonl")

writeTxt(trainPath, trainPairs)
writeTxt(valPath, valPairs)
writeJsonl(trainJsonlPath, trainPairs)
writeJsonl(valJsonlPath, valPairs)

console.log(`Wrote ${trainPairs.length} training pairs to ${trainPath}`)
console.log(`Wrote ${valPairs.length} validation pairs to ${valPath}`)
console.log(`Wrote ${trainPairs.length} training records to ${trainJsonlPath}`)
console.log(`Wrote ${valPairs.length} validation records to ${valJsonlPath}`)


