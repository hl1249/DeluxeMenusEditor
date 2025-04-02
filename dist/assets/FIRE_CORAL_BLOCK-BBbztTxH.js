const A="data:image/png;base64,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";export{A as default};
