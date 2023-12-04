"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import Item from "./item";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
}

const DocumentList = ({ parentDocumentId, level }: DocumentListProps) => {
  const documents = useQuery(api.documents.getDocument, {
    parentDocument: parentDocumentId,
  });

  return (
    <>
      {documents?.map((document) => (
        <div key={document._id}>
          <Item label={document?.title} id={document?._id} />
        </div>
      ))}
    </>
  );
};

export default DocumentList;
