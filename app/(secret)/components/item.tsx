"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal, Plus, Trash } from "lucide-react";
import React from "react";
import { userAgent } from "next/server";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

interface ItemProps {
  id: Id<"documents">;
  label: string;
}
const Item = ({ id, label }: ItemProps) => {
  const { user } = useUser();
  const createDocument = useMutation(api.documents.createDocument);

  const onCreateDocument = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!id) return;
    createDocument({
      title: "Untitled",
      parentDocument: id,
    });
  };

  return (
    <div
      style={{ paddingLeft: "12px" }}
      className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
    >
      {!!id && (
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          role="button"
        >
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      <span className="truncate">{label}</span>

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                role="button"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last Edited by {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            role="button"
            onClick={onCreateDocument}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
