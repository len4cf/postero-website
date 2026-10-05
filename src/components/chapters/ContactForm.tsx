import { useId, type FormEvent, type ReactNode } from "react";
import { contact } from "../../data/content";
import { cn } from "../../lib/cn";

const controlClass = cn(
  "peer box-border block w-full rounded-none border-0 bg-transparent px-0 pt-2 pb-3",
  "font-display text-[22px] leading-[1.35] font-light text-heading md:text-2xl",
  "placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-dim",
  "focus:outline-none focus-visible:outline-none",
  "autofill:shadow-[inset_0_0_0_1000px_var(--background)] autofill:[-webkit-text-fill-color:var(--heading)]",
);

type FieldProps = {
  index: number;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; className: string }) => ReactNode;
  className?: string;
};

function Field({ index, label, error, optional, children, className }: FieldProps) {
  const id = useId();
  return (
    <div className={cn("group flex flex-col", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4">
        <span className="flex items-baseline gap-3 text-label tracking-label text-muted uppercase transition-colors duration-300 group-focus-within:text-heading">
          <span aria-hidden className="font-display text-xs tracking-normal text-accent tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          {label}
        </span>
        {optional && <span className="text-xs text-dim">Opcional</span>}
      </label>
      <div className="relative">
        {children({ id, className: controlClass })}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line-dashed" />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft peer-focus:scale-x-100 peer-user-invalid:scale-x-100 peer-user-invalid:bg-danger"
        />
        {error && (
          <span className="absolute top-full left-0 mt-2 hidden text-xs text-danger peer-user-invalid:block">{error}</span>
        )}
      </div>
    </div>
  );
}

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const subject = `Agendar conversa — ${get("nome")}${get("empresa") ? ` (${get("empresa")})` : ""}`;
  const body = [
    `Nome: ${get("nome")}`,
    `Empresa: ${get("empresa")}`,
    `Contato: ${get("contato")}`,
    "",
    get("mensagem"),
  ].join("\n");
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const noteId = useId();
  return (
    <form
      aria-label="Agendar conversa"
      aria-describedby={noteId}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-8 gap-y-11 sm:grid-cols-2"
    >
      <Field index={1} label="Nome" error="Conte como posso te chamar.">
        {(p) => <input {...p} type="text" name="nome" autoComplete="name" placeholder="Seu nome" required />}
      </Field>
      <Field index={2} label="Empresa" optional>
        {(p) => <input {...p} type="text" name="empresa" autoComplete="organization" placeholder="Nome da empresa" />}
      </Field>
      <Field index={3} label="E-mail ou telefone" error="Deixe um e-mail ou telefone para o retorno." className="sm:col-span-2">
        {(p) => <input {...p} type="text" name="contato" autoComplete="email" placeholder="Como prefere ser contatado" required />}
      </Field>
      <Field index={4} label="Mensagem" optional className="sm:col-span-2">
        {(p) => (
          <textarea
            {...p}
            name="mensagem"
            rows={3}
            placeholder="O momento da empresa, da família, o que gostaria de conversar"
            className={cn(p.className, "min-h-[7.5rem] resize-none [field-sizing:content]")}
          />
        )}
      </Field>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group/submit inline-flex min-h-14 cursor-pointer items-center justify-center gap-4 rounded-[2px] border-0 bg-accent px-8 text-[15px] font-medium text-background transition-colors duration-300 hover:bg-accent-hover"
        >
          Agendar conversa
          <span aria-hidden className="inline-block transition-transform duration-500 ease-out-soft group-hover/submit:translate-x-1.5">
            →
          </span>
        </button>
        <p id={noteId} className="m-0 max-w-[260px] text-xs leading-5 text-dim">
          Ao enviar, seu aplicativo de e-mail abre com a mensagem pronta.
        </p>
      </div>
    </form>
  );
}
