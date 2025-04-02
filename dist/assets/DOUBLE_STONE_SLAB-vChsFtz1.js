const A="data:image/png;base64,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";export{A as default};
