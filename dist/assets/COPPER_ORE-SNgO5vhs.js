const A="data:image/png;base64,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";export{A as default};
