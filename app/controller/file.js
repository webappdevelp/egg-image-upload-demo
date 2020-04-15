'use strict';
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const awaitStreamReady = require('await-stream-ready').write;
const Controller = require('egg').Controller;

class FileController extends Controller {
  async index() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    this.logger.info('file', stream.filename);
    const fileName = `${Date.now()}_${stream.filename}`;
    const target = path.join(this.config.baseDir, 'app/public/upload/', fileName);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitStreamReady(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    ctx.body = { url: `${ctx.origin}/public/upload/${fileName}` };
    ctx.status = 200;
  }
}

module.exports = FileController;
