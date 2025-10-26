// ======================= components/shell.tsx =======================
import { ReactNode } from "react";


export function Shell({ title, description, actions, children }: {
title: string;
description?: string;
actions?: ReactNode;
children: ReactNode;
}) {
return (
<div className="px-4 md:px-6">
<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-4 mb-5">
<div>
<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
{description && (
<p className="text-sm text-muted-foreground mt-1">{description}</p>
)}
</div>
{actions}
</div>
<div className="grid gap-4">{children}</div>
</div>
);
}