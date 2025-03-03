"use client";

import { useCallback, useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import RehypeSanitize from "rehype-sanitize";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import Router from "next/router";
import { createStartup } from "@/actions";

export default function StartupForm() {
  const handleSubmit = (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      formSchema.parse(formValues);
      return createStartup(formValues).then((startup) => {
        Router.push(`/startup/${startup._id}`);
      });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as any);
        toast("Error", {
          description: "Please check your inputs and try again.",
        });
        return { ...prevState, error: "Validation failed.", status: "ERROR" };
      }
      toast("Error", {
        description: "An unexpected error has occurred.",
      });
      return {
        ...prevState,
        error: "Unexpected error occurred.",
        status: "ERROR",
      };
    }
  };

  const createIdea = (prevState: any, formData: FormData, pitch: string) => {
    throw new Error("Function not implemented.");
  };

  const [errors, setErrors] = useState<Record<string, string>>({
    title: "",
    description: "",
  });
  const [pitch, setPitch] = useState("");
  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });
  //   const isPending = false;

  const handleChangePitch = useCallback((value?: string) => {
    setPitch(value || "");
  }, []);

  return (
    <>
      <form action={formAction} className="startup-form">
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            placeholder="Startup Title"
          />
          {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="title" className="startup-form_label">
            description
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup-form_textarea"
            placeholder="Startup Description"
          />
          {errors.description && (
            <p className="startup-form_error">{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="startup-form_label">
            category
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input"
            required
            placeholder="Startup Category (e.g Tech, Health, Education)"
          />
          {errors.category && (
            <p className="startup-form_error">{errors.category}</p>
          )}
        </div>
        <div>
          <label htmlFor="link" className="startup-form_label">
            Image URL
          </label>
          <Input
            id="link"
            name="link"
            className="startup-form_input"
            required
            placeholder="Startup Image URL"
          />
          {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>
        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(val) => handleChangePitch(val)}
            id="pitch"
            preview="edit"
            height={300}
            className="!rounded-[20px] overflow-hidden"
            textareaProps={{
              placeholder:
                "Briefly describe your idea. What problem does it solve?",
            }}
            previewOptions={{
              disallowedElements: ["style"],
              rehypePlugins: [[RehypeSanitize]],
            }}
          ></MDEditor>
          {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
        <Button type="submit" className="startup-form_btn" disabled={isPending}>
          {isPending ? "Submitting..." : "Create Startup"}
          <Send className="size-6 ml-1" />
        </Button>
      </form>
    </>
  );
}
