const A="data:image/png;base64,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";export{A as default};
