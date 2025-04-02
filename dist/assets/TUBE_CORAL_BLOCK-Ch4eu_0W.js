const A="data:image/png;base64,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";export{A as default};
