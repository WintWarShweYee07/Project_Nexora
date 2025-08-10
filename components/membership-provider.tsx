"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type MembershipTier = "free" | "member" | "creator"

type MembershipContextValue = {
    tier: MembershipTier
    isPaidMember: boolean
    startMembershipCheckout: () => Promise<void>
    openBillingPortal: () => Promise<void>
    upgradeToMember: () => Promise<void>
    upgradeToCreator: () => Promise<void>
    cancelMembership: () => Promise<void>
}

const MembershipContext = createContext<MembershipContextValue | null>(null)

export function MembershipProvider({ children }: { children: React.ReactNode }) {
    const [tier, setTier] = useState<MembershipTier>("free")

    // Restore persisted tier
    useEffect(() => {
        const stored = typeof window !== "undefined" ? window.localStorage.getItem("membership:tier") : null
        if (stored === "member" || stored === "creator") {
            setTier(stored)
        }
    }, [])

    // Persist changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("membership:tier", tier)
        }
    }, [tier])

    const upgradeToMember = useCallback(async () => {
        // TODO: Integrate with backend Stripe monthly subscription checkout
        // For now, simulate success
        setTier("member")
        return Promise.resolve()
    }, [])

    const upgradeToCreator = useCallback(async () => {
        // TODO: Integrate with backend one-time creator upgrade fee + monthly plan if required
        setTier("creator")
        return Promise.resolve()
    }, [])

    const cancelMembership = useCallback(async () => {
        // TODO: Integrate with backend to cancel monthly plan
        setTier("free")
        return Promise.resolve()
    }, [])

    const startMembershipCheckout = useCallback(async () => {
        try {
            const res = await fetch("/api/billing/checkout", { method: "POST" })
            if (res.ok) {
                const data = await res.json()
                if (data?.url) {
                    window.location.href = data.url
                    return
                }
            }
            // fallback demo
            await upgradeToMember()
            alert("Demo: Upgraded to Premium (no backend checkout configured).")
        } catch (e) {
            await upgradeToMember()
            alert("Demo: Upgraded to Premium (no backend checkout configured).")
        }
    }, [upgradeToMember])

    const openBillingPortal = useCallback(async () => {
        try {
            const res = await fetch("/api/billing/portal", { method: "POST" })
            if (res.ok) {
                const data = await res.json()
                if (data?.url) {
                    window.location.href = data.url
                    return
                }
            }
            alert("Billing portal not configured. Please set up /api/billing/portal.")
        } catch (e) {
            alert("Billing portal not configured. Please set up /api/billing/portal.")
        }
    }, [])

    const value = useMemo<MembershipContextValue>(
        () => ({
            tier,
            isPaidMember: tier === "member" || tier === "creator",
            startMembershipCheckout,
            openBillingPortal,
            upgradeToMember,
            upgradeToCreator,
            cancelMembership,
        }),
        [tier, startMembershipCheckout, openBillingPortal, upgradeToMember, upgradeToCreator, cancelMembership]
    )

    return <MembershipContext.Provider value={value}>{children}</MembershipContext.Provider>
}

export function useMembership() {
    const ctx = useContext(MembershipContext)
    if (!ctx) throw new Error("useMembership must be used within a MembershipProvider")
    return ctx
}


