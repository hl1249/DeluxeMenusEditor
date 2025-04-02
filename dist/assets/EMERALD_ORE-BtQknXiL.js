const A="data:image/png;base64,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";export{A as default};
