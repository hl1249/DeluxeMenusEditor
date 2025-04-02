const A="data:image/png;base64,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";export{A as default};
