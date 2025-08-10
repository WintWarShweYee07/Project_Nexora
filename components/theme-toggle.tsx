"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "System", value: "system" },
]

const colorThemes = [
  { name: "Default", value: "default", color: "bg-blue-500" },
  { name: "Rose", value: "rose", color: "bg-rose-500" },
  { name: "Orange", value: "orange", color: "bg-orange-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Pink", value: "pink", color: "bg-pink-500" },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = React.useState("default")

  React.useEffect(() => {
    const savedColorTheme = localStorage.getItem("color-theme") || "default"
    setColorTheme(savedColorTheme)
    document.documentElement.setAttribute("data-color-theme", savedColorTheme)
  }, [])

  const handleColorThemeChange = (newColorTheme: string) => {
    setColorTheme(newColorTheme)
    localStorage.setItem("color-theme", newColorTheme)
    document.documentElement.setAttribute("data-color-theme", newColorTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          Theme Mode
        </DropdownMenuLabel>
        {themes.map((themeOption) => (
          <DropdownMenuItem key={themeOption.value} onClick={() => setTheme(themeOption.value)}>
            {themeOption.name}
            {theme === themeOption.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Color Theme
        </DropdownMenuLabel>
        {colorThemes.map((colorThemeOption) => (
          <DropdownMenuItem
            key={colorThemeOption.value}
            onClick={() => handleColorThemeChange(colorThemeOption.value)}
            className="flex items-center gap-2"
          >
            <div className={`h-4 w-4 rounded-full ${colorThemeOption.color}`} />
            {colorThemeOption.name}
            {colorTheme === colorThemeOption.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
