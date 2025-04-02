const A="data:image/png;base64,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";export{A as default};
