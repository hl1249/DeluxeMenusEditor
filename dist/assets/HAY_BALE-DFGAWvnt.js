const A="data:image/png;base64,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";export{A as default};
