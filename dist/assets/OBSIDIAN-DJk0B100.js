const A="data:image/png;base64,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";export{A as default};
