import { useEffect, useMemo, useRef } from "react";
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { customTheme } from "../extensions/theme";
import { getLanguageExtension } from "../extensions/language-extension";

interface CodeEditorProps {
    filename: string
}

export const CodeEditor = ({ filename }: CodeEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView>(null);

    const languageExtension = useMemo(() => {
        return getLanguageExtension(filename)
    }, [filename]);

    useEffect(() => {
        if (!editorRef.current) return;

        const view = new EditorView({
            doc: "Start Document",
            parent: editorRef.current,
            extensions: [
                oneDark,
                customTheme,
                basicSetup,
                languageExtension,
                javascript({ typescript: true }),
            ]
        })

        viewRef.current = view;

        return () => {
            view.destroy();
        }
    }, [])

    return (
        <div ref={editorRef} className="size-full pl-4 bg-background" />
    )
}