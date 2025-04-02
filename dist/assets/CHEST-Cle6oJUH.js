const A="data:image/png;base64,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";export{A as default};
