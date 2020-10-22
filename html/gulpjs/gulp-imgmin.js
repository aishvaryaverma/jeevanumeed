import { src, dest } from 'gulp';
import imagemin from 'gulp-imagemin';
import { paths } from '../gulpfile.babel';

export const compressImg = () => {
    return src(paths.img.src)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(dest(paths.img.dest))
};