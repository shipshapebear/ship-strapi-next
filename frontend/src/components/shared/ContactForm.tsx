"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const EmailSchema = z.object({
  email: z.string().max(40).email(),
  subject: z.string().max(40).optional(),
  message: z.string().max(255).min(10),
  name: z.string().max(40).optional(),
});

type EmailValues = z.infer<typeof EmailSchema>;

// This can come from your database or API.
const defaultValues: Partial<EmailValues> = {
  email: "",
  subject: "",
  message: "",
  name: "",
};

export function ContactForm(props: any) {
  const contact = props.data.Contact;
  const form = useForm<EmailValues>({
    resolver: zodResolver(EmailSchema),
    defaultValues,
    mode: "onChange",
  });

  const { toast } = useToast();
  function onSubmit(data: EmailValues) {
    const template_params = {
      from_name: data.name,
      message: data.message,
      subject: data.subject,
      email: data.email,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        template_params,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
      )
      .then(
        (response) => {
          form.reset();
        },
        (error) => {
          toast({
            title: "Error",
            description: <p>Error sending message. Please try again.</p>,
          });
        },
      )
      .finally(() => {
        toast({
          title: "Message Sent",
          description: <p>{contact.SuccessMessage}</p>,
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{contact.NameLabel || "Name"}</FormLabel>
              <FormControl>
                <Input placeholder={contact.NameLabel || "Name"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{contact.EmailLabel || "Email"}</FormLabel>
              <FormControl>
                <Input placeholder={contact.EmailLabel || "Email"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{contact.SubjectLabel || "Subject"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={contact.SubjectLabel || "Subject"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{contact.MessageLabel || "Message"} </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-auto block">
          {contact.ButtonTextLabel || "Send"}
        </Button>
      </form>
    </Form>
  );
}
