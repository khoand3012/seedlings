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
import { useRouter } from "next/navigation";
import { createStartup } from "@/sanity/lib/actions";

export default function StartupForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({
    title: "",
    description: "",
  });
  const [pitch, setPitch] = useState("");

  const handleChangePitch = useCallback((value?: string) => {
    setPitch(value || "");
  }, []);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch,
      };

      formSchema.parse(formValues);
      const result = await createStartup(formValues);
      console.log("🚀 ~ handleSubmit ~ result:", result);
      if (result.status === "SUCCESS") {
        toast("Success", {
          description: "Your startup pitch has been created successfully.",
        });
        router.push(`/startup/${result._id}`);
      }
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

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

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
          <label htmlFor="image" className="startup-form_label">
            Image URL
          </label>
          <Input
            id="image"
            name="image"
            className="startup-form_input"
            required
            placeholder="Startup Image URL"
          />
          {errors.image && <p className="startup-form_error">{errors.image}</p>}
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
            className="!rounded-[20px] overflow-hidden border-[3px] border-solid border-black"
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
