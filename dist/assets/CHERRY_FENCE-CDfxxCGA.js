const A="data:image/png;base64,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";export{A as default};
