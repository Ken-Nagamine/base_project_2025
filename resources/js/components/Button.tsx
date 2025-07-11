import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

function Button({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {asChild?: boolean}) {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            data-slot="button"
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer ${className}`}
            {...props}
        />
    )
}

export { Button }