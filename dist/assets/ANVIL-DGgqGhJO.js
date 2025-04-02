const A="data:image/png;base64,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";export{A as default};
