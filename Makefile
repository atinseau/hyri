
prepare:
	@(cd my-app && bun install)
	@printf "\nLinking react and react-dom to hyri/node_modules...\n\n"
	@(cd hyri && bun install && \
		cd node_modules && \
		ln -s ../../my-app/node_modules/react && \
		ln -s ../../my-app/node_modules/react-dom \
	)

clean:
	(cd my-app && bun clean)
	(cd hyri && bun clean)

fclean: clean prepare

run:
	(cd my-app && bun run dev)


.DEFAULT_GOAL := run