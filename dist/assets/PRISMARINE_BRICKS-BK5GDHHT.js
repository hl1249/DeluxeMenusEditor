const A="data:image/png;base64,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";export{A as default};
