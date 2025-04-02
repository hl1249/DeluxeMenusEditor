const A="data:image/png;base64,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";export{A as default};
